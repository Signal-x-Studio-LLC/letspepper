'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cfImageUrl } from '@/lib/cloudflare-images'
import type { Photo } from '@/types/photo'

interface LightboxProps {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const photo = photos[currentIndex]
  if (!photo) return null

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (hasPrev) onNavigate(currentIndex - 1)
          break
        case 'ArrowRight':
          if (hasNext) onNavigate(currentIndex + 1)
          break
      }
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-pepper-black/95"
          onClick={onClose}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-10 p-2 rounded-full',
            'bg-pepper-charcoal/80 text-white hover:bg-pepper-charcoal',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-jalapeno'
          )}
          aria-label="Close lightbox"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation: Previous */}
        {hasPrev && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className={cn(
              'absolute left-4 z-10 p-2 rounded-full',
              'bg-pepper-charcoal/80 text-white hover:bg-pepper-charcoal',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-jalapeno'
            )}
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Navigation: Next */}
        {hasNext && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className={cn(
              'absolute right-4 z-10 p-2 rounded-full',
              'bg-pepper-charcoal/80 text-white hover:bg-pepper-charcoal',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-jalapeno'
            )}
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Photo */}
        <motion.div
          key={photo.id}
          className="relative w-[90vw] h-[85vh]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={cfImageUrl(photo.cfImageId, 'large')}
            alt={`${photo.sportType} ${photo.photoCategory} photo`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-accent text-xs text-text-secondary">
          {currentIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
