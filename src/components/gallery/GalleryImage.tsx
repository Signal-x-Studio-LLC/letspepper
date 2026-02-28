'use client'

import Image from 'next/image'
import { cfImageUrl, type CFVariant } from '@/lib/cloudflare-images'

interface GalleryImageProps {
  cfImageId: string
  alt: string
  variant?: CFVariant
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

export function GalleryImage({
  cfImageId,
  alt,
  variant = 'grid',
  fill,
  width,
  height,
  sizes,
  className,
  priority = false,
}: GalleryImageProps) {
  const src = cfImageUrl(cfImageId, variant)
  const blurSrc = cfImageUrl(cfImageId, 'thumbnail')

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  )
}
