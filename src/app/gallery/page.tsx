import { fetchLPOAlbums, fetchGalleryStats } from '@/lib/gallery'
import { GalleryLanding } from './GalleryLanding'

export default async function GalleryPage() {
  const [albums, stats] = await Promise.all([
    fetchLPOAlbums(),
    fetchGalleryStats(),
  ])

  return <GalleryLanding albums={albums} stats={stats} />
}
