'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { awardCategories, AWARDS_RESULTS_REVEALED } from '@/lib/awards-data'
import { HEAT_CONFIG, type HeatLevel } from '@/lib/heat-config'
import { getStoredValue, setStoredValue, getDeviceId, STORAGE_KEYS } from '@/lib/local-storage'

interface VoteState {
  votes: Record<string, string> // categoryId -> nomineeId
  submitted: boolean
  deviceId: string
}

export default function AwardsPage() {
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const saved = getStoredValue<VoteState>(STORAGE_KEYS.AWARDS_VOTES, {
      votes: {},
      submitted: false,
      deviceId: '',
    })
    setVotes(saved.votes)
    setSubmitted(saved.submitted)
  }, [])

  function handleVote(categoryId: string, nomineeId: string) {
    if (submitted) return
    setVotes(prev => {
      const next = { ...prev, [categoryId]: nomineeId }
      return next
    })
  }

  function handleSubmit() {
    const deviceId = getDeviceId()
    const state: VoteState = { votes, submitted: true, deviceId }
    setStoredValue(STORAGE_KEYS.AWARDS_VOTES, state)
    setSubmitted(true)
  }

  const votedCount = Object.keys(votes).length

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
                Pepper <span className="text-heat-habanero">Awards</span>
              </h1>
              <p className="text-xl text-zinc-400">
                Vote for the best of the 2025 season. One vote per category. Choose wisely.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Award Categories */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <motion.div
              className="space-y-12"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.15 }}
            >
              {awardCategories.map((category) => {
                const heat = HEAT_CONFIG[category.heat as HeatLevel]
                const selectedNominee = votes[category.id]

                return (
                  <motion.div
                    key={category.id}
                    variants={MOTION.variants.slideUp}
                  >
                    {/* Category Header */}
                    <div className="mb-6">
                      <p className={cn('font-accent text-xs uppercase tracking-wider mb-1', heat.textClass)}>
                        {category.pepperName}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl uppercase text-white mb-2">
                        {category.name}
                      </h2>
                      <p className="text-zinc-400 text-sm">{category.description}</p>
                    </div>

                    {/* Nominees */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.nominees.map((nominee) => {
                        const isSelected = selectedNominee === nominee.id

                        return (
                          <motion.button
                            key={nominee.id}
                            type="button"
                            onClick={() => handleVote(category.id, nominee.id)}
                            disabled={submitted}
                            className={cn(
                              'text-left p-4 rounded-xl border transition-all',
                              isSelected
                                ? cn('border-l-4', heat.borderClass, 'bg-zinc-900/60')
                                : 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700',
                              submitted && 'cursor-default'
                            )}
                            whileTap={!submitted ? { scale: 0.98 } : undefined}
                          >
                            <p className={cn('font-display text-lg uppercase mb-1', isSelected ? 'text-white' : 'text-zinc-300')}>
                              {nominee.name}
                            </p>
                            <p className="text-xs text-zinc-500">{nominee.reason}</p>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Submit */}
            {!submitted && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={votedCount < awardCategories.length}
                  className={cn(
                    'btn-primary',
                    votedCount < awardCategories.length && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  Submit Votes ({votedCount}/{awardCategories.length})
                </button>
                {votedCount < awardCategories.length && (
                  <p className="text-xs text-zinc-600 mt-2">Vote in all categories to submit</p>
                )}
              </div>
            )}

            {/* Confirmation */}
            <AnimatePresence>
              {submitted && !AWARDS_RESULTS_REVEALED && (
                <motion.div
                  className="mt-12 bg-zinc-900/30 rounded-xl border border-heat-bell/30 p-8 text-center max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-display text-2xl uppercase text-heat-bell mb-2">
                    Votes Submitted!
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    Thanks for voting! Winners will be announced at the end of the season.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
