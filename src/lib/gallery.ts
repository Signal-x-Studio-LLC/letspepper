/**
 * Gallery Data Fetching — Server-side only
 *
 * Queries the shared Supabase database (same as nino-chavez-gallery)
 * scoped to Let's Pepper tournament albums.
 */

import { supabase } from './supabase'
import type { Photo, Album } from '@/types/photo'

/** Columns needed for photo display (avoids fetching embeddings/heavy data) */
const PHOTO_COLUMNS =
  'photo_id, image_key, cf_image_id, album_key, album_name, sport_type, photo_category, play_type, action_intensity, aspect_ratio, photo_date, upload_date'

/**
 * LPO album allowlist — explicit album keys from the Let's Pepper Open Series.
 * Source of truth: SmugMug folder /Sports/Volleyball/Grass/LPO
 *
 * To add a new event: push its Supabase album_key to this array.
 * TODO: Replace with `gallery_scope = 'lpo'` column on album_settings.
 */
const LPO_ALBUM_KEYS = [
  'j5MfJD', // Bell Pepper Open – Official Gallery
  '5M7kNx', // Grass Launch | Open Triples Tournament
  'QwhCK5', // Bell Pepper - Final Match Highlights (video)
  'p4J2jk', // Bell Pepper Open - Video Highlights (video)
]

// ---------------------------------------------------------------------------
// Album queries
// ---------------------------------------------------------------------------

export async function fetchLPOAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from('albums_summary')
    .select('*')
    .in('album_key', LPO_ALBUM_KEYS)
    .order('latest_photo_date', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('[Gallery] Error fetching LPO albums:', error.message)
    return []
  }

  return (data || []).map((row) => ({
    albumKey: row.album_key,
    albumName: row.album_name || 'Unknown Album',
    photoCount: parseInt(row.photo_count) || 0,
    coverCfImageId: row.cover_cf_image_id ?? null,
    primarySport: row.primary_sport || 'volleyball',
    primaryCategory: row.primary_category || 'action',
    earliestPhotoDate: row.earliest_photo_date,
    latestPhotoDate: row.latest_photo_date,
    sports: row.sports || [],
    categories: row.categories || [],
  }))
}

// ---------------------------------------------------------------------------
// Photo queries
// ---------------------------------------------------------------------------

interface FetchPhotosOptions {
  albumKey: string
  page?: number
  pageSize?: number
}

export async function fetchAlbumPhotos(
  options: FetchPhotosOptions
): Promise<{ photos: Photo[]; totalCount: number }> {
  const { albumKey, page = 1, pageSize = 48 } = options
  const offset = (page - 1) * pageSize

  const [{ data, error }, { count }] = await Promise.all([
    supabase
      .from('photo_metadata')
      .select(PHOTO_COLUMNS)
      .eq('album_key', albumKey)
      .not('sharpness', 'is', null)
      .order('upload_date', { ascending: false })
      .range(offset, offset + pageSize - 1),
    supabase
      .from('photo_metadata')
      .select('photo_id', { count: 'exact', head: true })
      .eq('album_key', albumKey)
      .not('sharpness', 'is', null),
  ])

  if (error) {
    console.error('[Gallery] Error fetching album photos:', error.message)
    return { photos: [], totalCount: 0 }
  }

  return {
    photos: (data || []).map(transformRow),
    totalCount: count || 0,
  }
}

export async function fetchPhoto(photoId: string): Promise<Photo | null> {
  const { data, error } = await supabase
    .from('photo_metadata')
    .select(PHOTO_COLUMNS)
    .eq('photo_id', photoId)
    .single()

  if (error || !data) return null
  return transformRow(data)
}

export async function fetchGalleryStats(): Promise<{
  totalPhotos: number
  totalAlbums: number
}> {
  const albums = await fetchLPOAlbums()
  const totalPhotos = albums.reduce((sum, a) => sum + a.photoCount, 0)
  return { totalPhotos, totalAlbums: albums.length }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function transformRow(row: Record<string, unknown>): Photo {
  return {
    id: row.photo_id as string,
    imageKey: row.image_key as string,
    cfImageId: row.cf_image_id as string,
    albumKey: row.album_key as string,
    albumName: row.album_name as string,
    sportType: row.sport_type as string,
    photoCategory: row.photo_category as string,
    playType: (row.play_type as string) || null,
    actionIntensity: (row.action_intensity as string) || 'medium',
    photoDate: (row.photo_date as string) || null,
    uploadDate: row.upload_date as string,
    aspectRatio: (row.aspect_ratio as number) || null,
  }
}
