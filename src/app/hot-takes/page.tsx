'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { seededTakes, type HotTake } from '@/lib/hot-takes-data'
import { HEAT_CONFIG, type HeatLevel } from '@/lib/heat-config'
import { getStoredValue, setStoredValue, STORAGE_KEYS } from '@/lib/local-storage'

const HEAT_BORDER: Record<string, string> = {
  bell: 'border-heat-bell/30',
  jalapeno: 'border-heat-jalapeno/30',
  poblano: 'border-heat-poblano/30',
  habanero: 'border-heat-habanero/30',
  reaper: 'border-red-600/30',
}

export default function HotTakesPage() {
  const [customTakes, setCustomTakes] = useState<HotTake[]>([])
  const [reactions, setReactions] = useState<Record<string, boolean>>({})
  const [newTake, setNewTake] = useState('')

  useEffect(() => {
    setCustomTakes(getStoredValue<HotTake[]>(STORAGE_KEYS.HOT_TAKES_CUSTOM, []))
    setReactions(getStoredValue<Record<string, boolean>>(STORAGE_KEYS.HOT_TAKES_REACTIONS, {}))
  }, [])

  const allTakes = [...seededTakes, ...customTakes]

  function handleReaction(takeId: string) {
    setReactions(prev => {
      const next = { ...prev, [takeId]: !prev[takeId] }
      setStoredValue(STORAGE_KEYS.HOT_TAKES_REACTIONS, next)
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newTake.trim() || newTake.length > 280) return

    const heats: HotTake['heat'][] = ['bell', 'jalapeno', 'poblano', 'habanero', 'reaper']
    const randomHeat = heats[Math.floor(Math.random() * heats.length)]

    const take: HotTake = {
      id: `custom-${Date.now()}`,
      text: newTake.trim(),
      author: 'You',
      heat: randomHeat,
    }

    const updated = [take, ...customTakes]
    setCustomTakes(updated)
    setStoredValue(STORAGE_KEYS.HOT_TAKES_CUSTOM, updated)
    setNewTake('')
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
                  disabled={!newTake.trim()}
                  className={cn('btn-primary', !newTake.trim() && 'opacity-50 cursor-not-allowed')}
                >
                  Post
                </button>
              </div>
              <p className="text-xs text-zinc-600 mt-1 font-accent">
                {newTake.length}/280 characters
              </p>
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
              {allTakes.map((take) => {
                const borderColor = HEAT_BORDER[take.heat] || HEAT_BORDER.bell
                const heat = HEAT_CONFIG[take.heat as HeatLevel] || HEAT_CONFIG.bell
                const isLit = reactions[take.id]

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
                          isLit
                            ? cn('bg-heat-habanero/20', heat.textClass)
                            : 'text-zinc-600 hover:text-zinc-400'
                        )}
                        aria-label={isLit ? 'Remove fire reaction' : 'Add fire reaction'}
                      >
                        🔥
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
