/**
 * Supabase Server Client for Let's Pepper Gallery
 *
 * SERVER-SIDE ONLY — used in Next.js Server Components and Route Handlers.
 * Reads from the same Supabase database as nino-chavez-gallery.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
