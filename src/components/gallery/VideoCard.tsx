'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Video } from '@/types/photo'

interface VideoCardProps {
  video: Video
  onClick?: () => void
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailSrc = video.cfStreamThumbnail || null

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative aspect-video rounded-lg overflow-hidden w-full',
        'bg-pepper-charcoal cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-jalapeno'
      )}
      variants={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Thumbnail */}
      {thumbnailSrc ? (
        <Image
          src={thumbnailSrc}
          alt={video.title || 'Video thumbnail'}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-pepper-dark flex items-center justify-center">
          <span className="font-accent text-sm text-text-muted uppercase">Video</span>
        </div>
      )}

      {/* Play icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center',
            'bg-pepper-black/60 backdrop-blur-sm border border-white/20',
            'group-hover:bg-heat-jalapeno/80 group-hover:border-heat-jalapeno',
            'transition-all duration-300'
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient + info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pepper-black/80 via-pepper-black/30 to-transparent p-3 pt-8">
        <div className="flex items-end justify-between">
          {video.title && (
            <span className="font-accent text-xs text-white/90 truncate mr-2">
              {video.title}
            </span>
          )}
          {video.durationSeconds && (
            <span className="font-accent text-[10px] text-white bg-pepper-black/60 px-1.5 py-0.5 rounded shrink-0">
              {formatDuration(video.durationSeconds)}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
