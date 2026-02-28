'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { cfImageUrl } from '@/lib/cloudflare-images'
import type { Album } from '@/types/photo'

interface AlbumCardProps {
  album: Album
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function slugify(albumName: string, albumKey: string): string {
  const slug = albumName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}--${albumKey}`
}

export function AlbumCard({ album }: AlbumCardProps) {
  const coverSrc = album.coverCfImageId
    ? cfImageUrl(album.coverCfImageId, 'medium')
    : null
  const slug = slugify(album.albumName, album.albumKey)

  return (
    <Link href={`/gallery/${slug}`}>
      <motion.article
        className={cn(
          'group relative aspect-[4/5] rounded-xl overflow-hidden',
          'bg-pepper-charcoal border border-border-subtle',
          'hover:border-heat-jalapeno/40 transition-colors duration-300'
        )}
        variants={MOTION.variants.scaleIn}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Cover Image */}
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={album.albumName}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            <span className="font-accent text-sm uppercase">No Cover</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pepper-black/90 via-pepper-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="font-accent text-[10px] text-heat-jalapeno uppercase tracking-wider mb-1">
            {formatDate(album.latestPhotoDate)}
            {album.photoCount > 0 && ` · ${album.photoCount} photos`}
          </p>
          <h3 className="font-display text-lg sm:text-xl text-white leading-tight">
            {album.albumName}
          </h3>
        </div>

        {/* Border Glow */}
        <div
          className="absolute inset-0 rounded-xl border border-heat-jalapeno/0 group-hover:border-heat-jalapeno/40 transition-colors duration-300"
          aria-hidden="true"
        />
      </motion.article>
    </Link>
  )
}
