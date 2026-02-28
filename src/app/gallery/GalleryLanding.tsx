'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AlbumCard } from '@/components/gallery/AlbumCard'
import type { Album } from '@/types/photo'

interface GalleryLandingProps {
  albums: Album[]
  stats: { totalPhotos: number; totalAlbums: number }
}

export function GalleryLanding({ albums, stats }: GalleryLandingProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {/* Hero */}
        <section className="section-padding pt-32 pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: MOTION.ease.outExpo }}
            >
              <p className="text-section-heading mb-4">Captured Moments</p>
              <h1 className="text-display mb-6">
                The <span className="text-heat-jalapeno">Gallery</span>
              </h1>
              <p className="text-text-secondary max-w-2xl text-lg">
                {stats.totalPhotos.toLocaleString()} photos across{' '}
                {stats.totalAlbums} events. Professional action sports
                photography from the Let&apos;s Pepper tournament circuit.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Album Grid */}
        <section className="section-padding pb-24">
          <div className="section-container">
            {albums.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-text-muted font-accent text-sm uppercase">
                  No events yet — check back soon
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                initial="initial"
                animate="animate"
                transition={{ staggerChildren: 0.1 }}
              >
                {albums.map((album, index) => (
                  <AlbumCard key={album.albumKey} album={album} priority={index < 3} />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
