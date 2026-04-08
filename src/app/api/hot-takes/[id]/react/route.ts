import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isValidUUID, badRequest, serverError, ok } from '../../../_lib/validate'

/** POST — toggle fire reaction (insert or delete + update fire_count) */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const takeId = parseInt(id, 10)
  if (isNaN(takeId)) return badRequest('Invalid take id')

  const body = await request.json().catch(() => null)
  if (!body) return badRequest('Invalid JSON')

  const { device_id } = body
  if (!isValidUUID(device_id)) return badRequest('Invalid device_id')

  // Check if reaction already exists
  const { data: existing } = await supabase
    .from('lp_hot_take_reactions')
    .select('id')
    .eq('device_id', device_id)
    .eq('take_id', takeId)
    .maybeSingle()

  if (existing) {
    // Remove reaction
    const { error: deleteError } = await supabase
      .from('lp_hot_take_reactions')
      .delete()
      .eq('id', existing.id)

    if (deleteError) {
      console.error('Reaction delete error:', deleteError)
      return serverError()
    }

    // Decrement fire count
    await supabase.rpc('lp_decrement_fire', { p_take_id: takeId })

    return ok({ reacted: false })
  } else {
    // Add reaction
    const { error: insertError } = await supabase
      .from('lp_hot_take_reactions')
      .insert({ device_id, take_id: takeId })

    if (insertError) {
      console.error('Reaction insert error:', insertError)
      return serverError()
    }

    // Increment fire count
    await supabase.rpc('lp_increment_fire', { p_take_id: takeId })

    return ok({ reacted: true })
  }
}
