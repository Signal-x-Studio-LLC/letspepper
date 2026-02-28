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
import type { Photo } from '@/types/photo'

interface AlbumDetailProps {
  albumName: string
  albumKey: string
  photos: Photo[]
  totalCount: number
  currentPage: number
  pageSize: number
  slug: string
}

export function AlbumDetail({
  albumName,
  photos,
  totalCount,
  currentPage,
  pageSize,
  slug,
}: AlbumDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const totalPages = Math.ceil(totalCount / pageSize)

  const openLightbox = useCallback((_photo: Photo, index: number) => {
    setLightboxIndex(index)
  }, [])

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
                {totalCount} photo{totalCount !== 1 ? 's' : ''}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="section-padding pb-12">
          <div className="section-container">
            <PhotoGrid photos={photos} onPhotoClick={openLightbox} />
          </div>
        </section>

        {/* Pagination */}
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
