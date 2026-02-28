'use client'

import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  cfStreamId: string
  title?: string | null
  className?: string
  onClose?: () => void
}

/**
 * Cloudflare Stream video player.
 * Uses the CF Stream iframe embed for adaptive bitrate streaming.
 */
export function VideoPlayer({ cfStreamId, title, className, onClose }: VideoPlayerProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-pepper-black/95 backdrop-blur-sm',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
      aria-label={title || 'Video player'}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className={cn(
          'absolute top-4 right-4 z-10 w-10 h-10 rounded-full',
          'flex items-center justify-center',
          'bg-pepper-charcoal/80 text-white hover:bg-pepper-dark',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-jalapeno'
        )}
        aria-label="Close video"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Video container */}
      <div className="relative w-full max-w-5xl mx-4 aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://customer-${CF_STREAM_SUBDOMAIN}.cloudflarestream.com/${cfStreamId}/iframe`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title={title || 'Video'}
        />
      </div>

      {/* Title */}
      {title && (
        <p className="absolute bottom-6 left-0 right-0 text-center font-accent text-sm text-white/80">
          {title}
        </p>
      )}
    </div>
  )
}

/**
 * CF Stream customer subdomain — set in env or fallback.
 * Format: https://customer-{subdomain}.cloudflarestream.com/{videoId}/iframe
 */
const CF_STREAM_SUBDOMAIN = process.env.NEXT_PUBLIC_CF_STREAM_SUBDOMAIN || 'f77l9nwspm9h0g13'
