'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PhotoGrid } from '@/components/gallery/PhotoGrid'
import { Lightbox } from '@/components/gallery/Lightbox'
import { VideoCard } from '@/components/gallery/VideoCard'
import { VideoPlayer } from '@/components/gallery/VideoPlayer'
import type { Photo, Video } from '@/types/photo'

interface AlbumDetailProps {
  albumName: string
  albumKey: string
  photos: Photo[]
  videos: Video[]
  totalCount: number
  currentPage: number
  pageSize: number
  slug: string
}

export function AlbumDetail({
  albumName,
  photos,
  videos,
  totalCount,
  currentPage,
  pageSize,
  slug,
}: AlbumDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const totalPages = Math.ceil(totalCount / pageSize)
  const hasPhotos = photos.length > 0
  const hasVideos = videos.length > 0

  const openLightbox = useCallback((_photo: Photo, index: number) => {
    setLightboxIndex(index)
  }, [])

  // Build summary line: "199 photos" / "3 videos" / "199 photos · 3 videos"
  const summaryParts: string[] = []
  if (totalCount > 0) summaryParts.push(`${totalCount} photo${totalCount !== 1 ? 's' : ''}`)
  if (videos.length > 0) summaryParts.push(`${videos.length} video${videos.length !== 1 ? 's' : ''}`)

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {/* Album Header */}
        <section className="section-padding pt-32 pb-8">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: MOTION.ease.outExpo }}
            >
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-6 font-accent text-xs uppercase tracking-wider"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Gallery
              </Link>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
                {albumName}
              </h1>
              <p className="text-text-secondary font-accent text-sm">
                {summaryParts.join(' \u00B7 ')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Grid */}
        {hasVideos && (
          <section className="section-padding pb-8">
            <div className="section-container">
              {hasPhotos && (
                <h2 className="font-accent text-xs uppercase tracking-wider text-heat-jalapeno mb-4">
                  Videos
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setActiveVideo(video)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Photo Grid */}
        {hasPhotos && (
          <section className="section-padding pb-12">
            <div className="section-container">
              {hasVideos && (
                <h2 className="font-accent text-xs uppercase tracking-wider text-heat-jalapeno mb-4">
                  Photos
                </h2>
              )}
              <PhotoGrid photos={photos} onPhotoClick={openLightbox} />
            </div>
          </section>
        )}

        {/* Pagination (photos only) */}
        {totalPages > 1 && (
          <section className="section-padding pb-24">
            <div className="section-container flex justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/gallery/${slug}?page=${currentPage - 1}`}
                  className={cn(
                    'px-4 py-2 rounded-lg font-accent text-xs uppercase tracking-wider',
                    'bg-pepper-charcoal text-white hover:bg-pepper-dark border border-border-subtle',
                    'transition-colors'
                  )}
                >
                  Previous
                </Link>
              )}

              <span className="px-4 py-2 font-accent text-xs text-text-secondary uppercase">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/gallery/${slug}?page=${currentPage + 1}`}
                  className={cn(
                    'px-4 py-2 rounded-lg font-accent text-xs uppercase tracking-wider',
                    'bg-pepper-charcoal text-white hover:bg-pepper-dark border border-border-subtle',
                    'transition-colors'
                  )}
                >
                  Next
                </Link>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />

      {/* Photo Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Video Player */}
      {activeVideo && (
        <VideoPlayer
          cfStreamId={activeVideo.cfStreamId}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
