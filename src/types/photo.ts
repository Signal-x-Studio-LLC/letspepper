/**
 * Photo & Album types for Let's Pepper Gallery
 *
 * Simplified subset of nino-chavez-gallery's Photo model,
 * containing only the fields needed for gallery display.
 */

export interface Photo {
  id: string
  imageKey: string
  cfImageId: string
  albumKey: string
  albumName: string
  sportType: string
  photoCategory: string
  playType: string | null
  actionIntensity: string
  photoDate: string | null
  uploadDate: string
  aspectRatio: number | null
}

export interface Album {
  albumKey: string
  albumName: string
  photoCount: number
  coverCfImageId: string | null
  primarySport: string
  primaryCategory: string
  earliestPhotoDate: string | null
  latestPhotoDate: string | null
  sports: string[]
  categories: string[]
}
