import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isValidUUID, badRequest, serverError, ok } from '../_lib/validate'

const VALID_HEATS = ['bell', 'poblano', 'jalapeno', 'habanero', 'reaper']

/** GET — list approved takes with fire counts + user reaction state */
export async function GET(request: NextRequest) {
  const deviceId = request.nextUrl.searchParams.get('device_id')

  // Fetch approved takes
  const { data: takes, error } = await supabase
    .from('lp_hot_takes')
    .select('id, text, author, heat, fire_count, is_seed, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Hot takes fetch error:', error)
    return serverError()
  }

  // If device_id provided, fetch their reactions to mark which takes they've fired
  let userReactions = new Set<number>()
  if (deviceId && isValidUUID(deviceId)) {
    const { data: reactions } = await supabase
      .from('lp_hot_take_reactions')
      .select('take_id')
      .eq('device_id', deviceId)

    if (reactions) {
      userReactions = new Set(reactions.map((r) => r.take_id))
    }
  }

  const result = takes.map((take) => ({
    id: take.id,
    text: take.text,
    author: take.author,
    heat: take.heat,
    fireCount: take.fire_count,
    isSeed: take.is_seed,
    userReacted: userReactions.has(take.id),
  }))

  return ok({ takes: result })
}

/** POST — submit a new hot take (status=pending, rate limited to 5 per device) */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return badRequest('Invalid JSON')

  const { device_id, text, author } = body
  if (!isValidUUID(device_id)) return badRequest('Invalid device_id')
  if (typeof text !== 'string' || text.trim().length === 0 || text.length > 280) {
    return badRequest('text must be 1-280 characters')
  }

  // Rate limit: max 5 takes per device
  const { count, error: countError } = await supabase
    .from('lp_hot_takes')
    .select('id', { count: 'exact', head: true })
    .eq('device_id', device_id)

  if (countError) {
    console.error('Hot take count error:', countError)
    return serverError()
  }

  if (count !== null && count >= 5) {
    return badRequest('Maximum 5 takes per device')
  }

  // Assign random heat
  const heat = VALID_HEATS[Math.floor(Math.random() * VALID_HEATS.length)]

  const { error } = await supabase.from('lp_hot_takes').insert({
    device_id,
    text: text.trim(),
    author: typeof author === 'string' && author.trim() ? author.trim() : 'Anonymous',
    heat,
    status: 'pending',
  })

  if (error) {
    console.error('Hot take insert error:', error)
    return serverError()
  }

  return ok({ success: true, status: 'pending' })
}
