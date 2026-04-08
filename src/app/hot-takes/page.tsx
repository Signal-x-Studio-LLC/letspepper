'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { HEAT_CONFIG, type HeatLevel } from '@/lib/heat-config'
import { getDeviceId } from '@/lib/local-storage'

interface Take {
  id: number
  text: string
  author: string
  heat: string
  fireCount: number
  isSeed: boolean
  userReacted: boolean
}

const HEAT_BORDER: Record<string, string> = {
  bell: 'border-heat-bell/30',
  jalapeno: 'border-heat-jalapeno/30',
  poblano: 'border-heat-poblano/30',
  habanero: 'border-heat-habanero/30',
  reaper: 'border-red-600/30',
}

export default function HotTakesPage() {
  const [takes, setTakes] = useState<Take[]>([])
  const [newTake, setNewTake] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const fetchTakes = useCallback(() => {
    const deviceId = getDeviceId()
    fetch(`/api/hot-takes?device_id=${deviceId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.takes) setTakes(data.takes)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchTakes()
  }, [fetchTakes])

  function handleReaction(takeId: number) {
    const deviceId = getDeviceId()

    // Optimistic update
    setTakes((prev) =>
      prev.map((t) =>
        t.id === takeId
          ? {
              ...t,
              userReacted: !t.userReacted,
              fireCount: t.userReacted ? Math.max(t.fireCount - 1, 0) : t.fireCount + 1,
            }
          : t
      )
    )

    fetch(`/api/hot-takes/${takeId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: deviceId }),
    }).catch(() => {
      // Revert on failure
      fetchTakes()
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newTake.trim() || newTake.length > 280 || submitting) return

    setSubmitting(true)
    const deviceId = getDeviceId()

    try {
      const res = await fetch('/api/hot-takes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, text: newTake.trim() }),
      })

      const data = await res.json()

      if (res.ok) {
        setNewTake('')
        setSubmitMessage('Submitted! Your take is pending review.')
        setTimeout(() => setSubmitMessage(null), 5000)
      } else {
        setSubmitMessage(data.error || 'Failed to submit')
        setTimeout(() => setSubmitMessage(null), 5000)
      }
    } catch {
      setSubmitMessage('Failed to submit. Try again.')
      setTimeout(() => setSubmitMessage(null), 5000)
    } finally {
      setSubmitting(false)
    }
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
              <p className="text-section-heading mb-4">Community</p>
              <h1 className="text-display mb-6">
                Hot <span className="text-heat-habanero">Takes</span>
              </h1>
              <p className="text-xl text-zinc-400">
                Spicy opinions about the Let&apos;s Pepper series. Agree? Disagree? Drop your own.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Submit Form */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <form onSubmit={handleSubmit} className="max-w-2xl mb-12">
              <label className="block font-accent text-xs uppercase tracking-wider text-zinc-500 mb-2">
                Drop Your Take
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTake}
                  onChange={(e) => setNewTake(e.target.value)}
                  maxLength={280}
                  placeholder="Your hottest take..."
                  className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-heat-habanero"
                />
                <button
                  type="submit"
                  disabled={!newTake.trim() || submitting}
                  className={cn('btn-primary', (!newTake.trim() || submitting) && 'opacity-50 cursor-not-allowed')}
                >
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-zinc-600 font-accent">
                  {newTake.length}/280 characters
                </p>
                {submitMessage && (
                  <p className="text-xs text-heat-bell font-accent animate-pulse">
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Takes Grid */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.05 }}
            >
              {takes.map((take) => {
                const borderColor = HEAT_BORDER[take.heat] || HEAT_BORDER.bell
                const heat = HEAT_CONFIG[take.heat as HeatLevel] || HEAT_CONFIG.bell

                return (
                  <motion.div
                    key={take.id}
                    className={cn(
                      'break-inside-avoid bg-zinc-900/30 rounded-xl border p-5',
                      borderColor
                    )}
                    variants={MOTION.variants.slideUp}
                  >
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                      &ldquo;{take.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-accent text-[10px] uppercase tracking-wider text-zinc-600">
                        — {take.author}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleReaction(take.id)}
                        className={cn(
                          'flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all',
                          take.userReacted
                            ? cn('bg-heat-habanero/20', heat.textClass)
                            : 'text-zinc-600 hover:text-zinc-400'
                        )}
                        aria-label={take.userReacted ? 'Remove fire reaction' : 'Add fire reaction'}
                      >
                        🔥 {take.fireCount > 0 && <span>{take.fireCount}</span>}
                      </button>
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
