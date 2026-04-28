import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createMenuSchema } from '@/lib/validations/menu.schema'
import { rateLimit, getIP } from '@/lib/rate-limit'

// Utility: generate a URL-friendly slug
function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') +
    '-' +
    Math.random().toString(36).slice(2, 7)
  )
}

// GET /api/menus — list all menus for the authenticated owner
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: menus, error } = await supabase
      .from('menus')
      .select(`
        id, slug, theme, is_active, created_at,
        restaurants ( id, name, logo_url, address, business_type )
      `)
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ menus })
  } catch (error: unknown) {
    console.error('GET /api/menus error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/menus — create a new menu
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 creates per minute per IP
    const ip = getIP(request)
    const { success } = await rateLimit(ip, 'create-menu', 10, 60)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── Plan limit check ──────────────────────────────────────────────────────
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan, menu_limit, status')
      .eq('owner_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    const menuLimit = subscription?.menu_limit ?? 0 // No plan = 0 menus

    const { count: menuCount } = await supabase
      .from('menus')
      .select('id', { count: 'exact', head: true })
      .eq('owner_id', user.id)

    if ((menuCount ?? 0) >= menuLimit) {
      return NextResponse.json(
        { error: `Your current plan allows ${menuLimit} menu(s). Please upgrade to create more.` },
        { status: 403 }
      )
    }

    // ── Validate body ─────────────────────────────────────────────────────────
    const body = await request.json()
    const parsed = createMenuSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      )
    }

    const { restaurant: restaurantData, menu: menuData, categories } = parsed.data

    // ── Insert restaurant ─────────────────────────────────────────────────────
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name: restaurantData.name,
        address: restaurantData.address,
        phone: restaurantData.phone || null,
        business_type: restaurantData.business_type || null,
        // logo_url handled separately via /api/upload after creation
      })
      .select()
      .single()

    if (restaurantError) throw restaurantError

    // ── Insert menu ───────────────────────────────────────────────────────────
    const slug = generateSlug(restaurantData.name)

    const { data: menu, error: menuError } = await supabase
      .from('menus')
      .insert({
        owner_id: user.id,
        restaurant_id: restaurant.id,
        slug,
        theme: menuData.theme ?? 'default',
        is_active: true, // always active if within plan limit
      })
      .select()
      .single()

    if (menuError) throw menuError

    // ── Insert categories + items ─────────────────────────────────────────────
    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
      const cat = categories[catIndex]

      const { data: category, error: catError } = await supabase
        .from('categories')
        .insert({
          menu_id: menu.id,
          name: cat.name,
          sort_order: catIndex,
        })
        .select()
        .single()

      if (catError) throw catError

      const itemInserts = cat.items.map((item, idx) => ({
        menu_id: menu.id,
        category_id: category.id,
        name: item.name,
        description: item.description ?? null,
        price: item.price,
        image_url: item.image_url || null,
        sort_order: idx,
        is_available: true,
        is_veg: item.is_veg,
      }))

      const { error: itemsError } = await supabase.from('menu_items').insert(itemInserts)
      if (itemsError) throw itemsError
    }

    return NextResponse.json(
      { menu: { id: menu.id, slug: menu.slug } },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('POST /api/menus error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
