import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ClassicTheme } from '@/components/menu-themes/ClassicTheme'
import { MidnightTheme } from '@/components/menu-themes/MidnightTheme'
import { FreshTheme } from '@/components/menu-themes/FreshTheme'
import { RoyalTheme } from '@/components/menu-themes/RoyalTheme'
import { SpiceTheme } from '@/components/menu-themes/SpiceTheme'
import { MenuData } from '@/components/menu-themes/types'
import { MenuTracker } from '@/components/menu/MenuTracker'

export const revalidate = 3600 // ISR: revalidate every hour

export default async function PublicMenuPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: menu } = await supabase
    .from('menus')
    .select(`
      id, slug, theme, is_active, owner_id,
      restaurants ( id, name, logo_url, address, business_type ),
      categories (
        id, name, sort_order,
        menu_items ( id, name, description, price, image_url, is_available, sort_order, is_veg )
      )
    `)
    .eq('slug', params.slug)
    .single()

  // Show 404 if menu doesn't exist or isn't active
  if (!menu || !menu.is_active) notFound()

  // Format data for themes
  const restaurant = menu.restaurants as any
  const categories = ((menu.categories ?? []) as any[])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      menu_items: (cat.menu_items ?? [])
        .filter((i: any) => i.is_available !== false)
        .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((i: any) => ({
          id: i.id,
          name: i.name,
          description: i.description,
          price: i.price,
          image_url: i.image_url,
          is_veg: i.is_veg ?? false,
        }))
    }))

  const menuData: MenuData = {
    restaurant: {
      name: restaurant.name,
      logo_url: restaurant.logo_url,
      address: restaurant.address,
      business_type: restaurant.business_type,
    },
    categories
  }

  const renderTheme = () => {
    switch (menu.theme) {
      case 'dark':
        return <MidnightTheme data={menuData} />
      case 'green':
        return <FreshTheme data={menuData} />
      case 'purple':
        return <RoyalTheme data={menuData} />
      case 'amber':
        return <SpiceTheme data={menuData} />
      case 'default':
      default:
        return <ClassicTheme data={menuData} />
    }
  }

  return (
    <>
      <MenuTracker menuId={menu.id} ownerId={menu.owner_id} />
      {renderTheme()}
    </>
  )
}

