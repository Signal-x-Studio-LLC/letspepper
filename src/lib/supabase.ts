/**
 * Supabase Server Client for Let's Pepper Gallery
 *
 * SERVER-SIDE ONLY — used in Next.js Server Components and Route Handlers.
 * Reads from the same Supabase database as nino-chavez-gallery.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (client) return client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}

// Lazy proxy: defer createClient() until first property access at request time,
// so `next build` page-data collection doesn't require the env vars.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})
