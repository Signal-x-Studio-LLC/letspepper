import { notFound } from 'next/navigation'
import { fetchAlbumPhotos } from '@/lib/gallery'
import { AlbumDetail } from './AlbumDetail'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ album: string }>
  searchParams: Promise<{ page?: string }>
}

/** Extract album key from the slug format: "album-name--albumKey" */
function extractAlbumKey(slug: string): string {
  const parts = slug.split('--')
  return parts.length > 1 ? parts[parts.length - 1] : slug
}

function extractAlbumSlugName(slug: string): string {
  const parts = slug.split('--')
  return parts.length > 1
    ? parts.slice(0, -1).join('--').replace(/-/g, ' ')
    : slug
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { album } = await params
  const name = extractAlbumSlugName(album)
  return {
    title: `${name} | Gallery | Let's Pepper`,
    description: `Photos from ${name} — Let's Pepper grassroots volleyball tournament.`,
  }
}

export default async function AlbumPage({ params, searchParams }: PageProps) {
  const { album } = await params
  const { page: pageParam } = await searchParams
  const albumKey = extractAlbumKey(album)
  const page = Math.max(1, parseInt(pageParam || '1'))

  const { photos, totalCount } = await fetchAlbumPhotos({
    albumKey,
    page,
    pageSize: 48,
  })

  if (totalCount === 0) {
    notFound()
  }

  // Get album name from the first photo or slug
  const albumName =
    photos[0]?.albumName || extractAlbumSlugName(album)

  return (
    <AlbumDetail
      albumName={albumName}
      albumKey={albumKey}
      photos={photos}
      totalCount={totalCount}
      currentPage={page}
      pageSize={48}
      slug={album}
    />
  )
}
