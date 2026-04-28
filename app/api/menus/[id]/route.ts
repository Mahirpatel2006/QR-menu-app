import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: { id: string } }

// GET /api/menus/[id] — fetch full menu with categories + items
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: menu, error } = await supabase
      .from('menus')
      .select(`
        id, slug, theme, is_active, created_at,
        restaurants ( id, name, logo_url, address, business_type ),
        categories (
          id, name, sort_order,
          menu_items ( id, name, description, price, image_url, is_available, is_veg, sort_order )
        )
      `)
      .eq('id', params.id)
      .eq('owner_id', user.id)
      .single()

    if (error) return NextResponse.json({ error: 'Menu not found' }, { status: 404 })

    return NextResponse.json({ menu })
  } catch (error: unknown) {
    console.error('GET /api/menus/[id] error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PATCH /api/menus/[id] — update full menu data
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // 1. Ownership check
    const { data: menu, error: fetchError } = await supabase
      .from('menus')
      .select('id, restaurant_id')
      .eq('id', params.id)
      .eq('owner_id', user.id)
      .single()

    if (fetchError || !menu) {
      return NextResponse.json({ error: 'Menu not found or not yours' }, { status: 404 })
    }

    // 2. Update Restaurant
    if (body.restaurant) {
      const { error: restError } = await supabase
        .from('restaurants')
        .update({
          name: body.restaurant.name,
          address: body.restaurant.address,
          phone: body.restaurant.phone,
          business_type: body.restaurant.business_type,
        })
        .eq('id', menu.restaurant_id)
      
      if (restError) throw restError
    }

    // 3. Update Menu (theme, etc)
    if (body.menu) {
      const { error: menuUpdateError } = await supabase
        .from('menus')
        .update({
          theme: body.menu.theme,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
      
      if (menuUpdateError) throw menuUpdateError
    }

    // 4. Update Categories & Items
    if (body.categories) {
      // Delete existing categories for this menu
      const { error: delError } = await supabase
        .from('categories')
        .delete()
        .eq('menu_id', params.id)
      
      if (delError) throw delError

      // Re-insert new categories and items
      for (let catIndex = 0; catIndex < body.categories.length; catIndex++) {
        const cat = body.categories[catIndex]

        const { data: category, error: catError } = await supabase
          .from('categories')
          .insert({
            menu_id: params.id,
            name: cat.name,
            sort_order: catIndex,
          })
          .select()
          .single()

        if (catError) throw catError

        if (cat.items && cat.items.length > 0) {
          const itemInserts = cat.items.map((item: any, idx: number) => ({
            menu_id: params.id,
            category_id: category.id,
            name: item.name,
            description: item.description ?? null,
            price: item.price,
            image_url: item.image_url || null,
            sort_order: idx,
            is_available: item.is_available ?? true,
            is_veg: item.is_veg ?? true,
          }))

          const { error: itemsError } = await supabase.from('menu_items').insert(itemInserts)
          if (itemsError) throw itemsError
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('PATCH error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

// DELETE /api/menus/[id] — delete menu and all related data (cascade handled by DB)
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('menus')
      .delete()
      .eq('id', params.id)
      .eq('owner_id', user.id) // ownership check

    if (error) return NextResponse.json({ error: 'Menu not found or not yours' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('DELETE /api/menus/[id] error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
