import { notFound } from 'next/navigation'
import { fetchPhoto } from '@/lib/gallery'
import { PhotoDetailView } from './PhotoDetailView'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const photo = await fetchPhoto(id)
  if (!photo) return { title: "Photo Not Found | Let's Pepper" }

  return {
    title: `${photo.sportType} ${photo.photoCategory} | Gallery | Let's Pepper`,
    description: `${photo.sportType} ${photo.photoCategory} photography from Let's Pepper tournaments.`,
  }
}

export default async function PhotoPage({ params }: PageProps) {
  const { id } = await params
  const photo = await fetchPhoto(id)

  if (!photo) {
    notFound()
  }

  return <PhotoDetailView photo={photo} />
}
