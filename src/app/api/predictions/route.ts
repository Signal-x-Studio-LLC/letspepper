import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isValidUUID, badRequest, serverError, ok } from '../_lib/validate'

/** POST — submit or update prediction picks + optional nickname */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return badRequest('Invalid JSON')

  const { device_id, event_id, picks, nickname } = body
  if (!isValidUUID(device_id)) return badRequest('Invalid device_id')
  if (typeof event_id !== 'string' || !event_id) return badRequest('event_id is required')
  if (!picks || typeof picks !== 'object') return badRequest('picks is required')

  const nick = typeof nickname === 'string' && nickname.trim().length > 0
    ? nickname.trim().slice(0, 30)
    : null

  const { error } = await supabase
    .from('lp_prediction_picks')
    .upsert(
      { device_id, event_id, picks, nickname: nick },
      { onConflict: 'device_id,event_id' }
    )

  if (error) {
    console.error('Prediction upsert error:', error)
    return serverError()
  }

  return ok({ success: true })
}

/** GET — leaderboard (if scored) or entry count + own picks */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const eventId = searchParams.get('event_id')
  const deviceId = searchParams.get('device_id')

  if (!eventId) return badRequest('event_id is required')

  // Get total entry count
  const { count, error: countError } = await supabase
    .from('lp_prediction_picks')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)

  if (countError) {
    console.error('Prediction count error:', countError)
    return serverError()
  }

  // Get leaderboard (top scored entries)
  const { data: leaderboard, error: lbError } = await supabase
    .from('lp_prediction_picks')
    .select('nickname, score')
    .eq('event_id', eventId)
    .not('score', 'is', null)
    .order('score', { ascending: false })
    .limit(50)

  if (lbError) {
    console.error('Leaderboard fetch error:', lbError)
    return serverError()
  }

  // Get own entry if device_id provided
  let ownEntry = null
  if (deviceId && isValidUUID(deviceId)) {
    const { data } = await supabase
      .from('lp_prediction_picks')
      .select('picks, nickname, score')
      .eq('device_id', deviceId)
      .eq('event_id', eventId)
      .maybeSingle()

    ownEntry = data
  }

  return ok({
    entryCount: count || 0,
    leaderboard: leaderboard || [],
    ownEntry,
  })
}
