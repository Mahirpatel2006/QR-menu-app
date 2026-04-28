'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function MenuTracker({ menuId, ownerId }: { menuId: string, ownerId: string }) {
  useEffect(() => {
    const trackView = async () => {
      const supabase = createClient()
      
      // Basic tracking: record menu_id, owner_id, and user_agent
      // viewer_ip is handled by Supabase/Postgres if we set up a function, 
      // but for now let's just track the scan.
      await supabase.from('menu_views').insert({
        menu_id: menuId,
        owner_id: ownerId,
        user_agent: navigator.userAgent
      })
    }

    trackView()
  }, [menuId, ownerId])

  return null
}
