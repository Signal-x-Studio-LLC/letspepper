'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { votablePhotos } from '@/lib/photo-vote-data'
import { getStoredValue, setStoredValue, STORAGE_KEYS } from '@/lib/local-storage'

export default function PhotoVotePage() {
  const [votedPhotoId, setVotedPhotoId] = useState<string | null>(null)

  useEffect(() => {
    const saved = getStoredValue<string | null>(STORAGE_KEYS.PHOTO_VOTE, null)
    setVotedPhotoId(saved)
  }, [])

  function handleVote(photoId: string) {
    if (votedPhotoId) return // Already voted
    setVotedPhotoId(photoId)
    setStoredValue(STORAGE_KEYS.PHOTO_VOTE, photoId)
  }

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: MOTION.ease.outExpo }}
            >
              <p className="text-section-heading mb-4">Fan Vote</p>
              <h1 className="text-display mb-6">
                Photo of the <span className="text-heat-poblano">Season</span>
              </h1>
              <p className="text-xl text-zinc-400">
                {votedPhotoId
                  ? 'Thanks for voting! Your pick has been recorded.'
                  : 'Pick your favorite photo from the 2025 season. One vote total.'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.08 }}
            >
              {votablePhotos.map((photo) => {
                const isVoted = votedPhotoId === photo.id
                const hasVoted = votedPhotoId !== null

                return (
                  <motion.div
                    key={photo.id}
                    className={cn(
                      'relative rounded-xl border overflow-hidden transition-all',
                      isVoted
                        ? 'border-heat-poblano/50 ring-2 ring-heat-poblano/30'
                        : 'border-zinc-800/50',
                      hasVoted && !isVoted && 'opacity-60'
                    )}
                    variants={MOTION.variants.slideUp}
                  >
                    {/* Placeholder image area */}
                    <div className="aspect-[4/3] bg-zinc-800/50 flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-3xl mb-2 block">📸</span>
                        <p className="text-xs text-zinc-500 font-accent uppercase tracking-wider">
                          {photo.event}
                        </p>
                      </div>
                    </div>

                    {/* Caption + Vote */}
                    <div className="p-4">
                      <p className="text-zinc-300 text-sm mb-2">{photo.caption}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-accent text-[10px] uppercase tracking-wider text-zinc-600">
                          {photo.photographer}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleVote(photo.id)}
                          disabled={hasVoted}
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-accent uppercase tracking-wider transition-all',
                            isVoted
                              ? 'bg-heat-poblano/20 text-heat-poblano border border-heat-poblano/50'
                              : hasVoted
                                ? 'bg-zinc-800/50 text-zinc-600 cursor-default'
                                : 'bg-zinc-800/50 text-zinc-400 hover:bg-heat-poblano/10 hover:text-heat-poblano border border-zinc-700/50 hover:border-heat-poblano/30'
                          )}
                        >
                          {isVoted ? 'Voted' : 'Vote'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
