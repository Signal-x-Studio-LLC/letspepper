'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { Header, Footer } from '@/components'
import { cn } from '@/lib/utils'
import { tournamentResults, getAllPlayers } from '@/lib/standings-data'
import { getStoredValue, setStoredValue, getDeviceId, STORAGE_KEYS } from '@/lib/local-storage'

export default function VotePage() {
  const [eventId, setEventId] = useState<string>('')
  const [players, setPlayers] = useState<string[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlEvent = params.get('event') || ''
    setEventId(urlEvent)

    // Get players from specific event or all players
    if (urlEvent) {
      const tournament = tournamentResults.find(t => t.id === urlEvent)
      if (tournament) {
        const eventPlayers = new Set<string>()
        tournament.results.forEach(r => r.players.forEach(p => eventPlayers.add(p)))
        setPlayers(Array.from(eventPlayers).sort())
      }
    } else {
      setPlayers(getAllPlayers())
    }

    // Check for existing vote
    const storageKey = `${STORAGE_KEYS.MVP_VOTE_PREFIX}${urlEvent || 'general'}`
    const saved = getStoredValue<{ player: string; deviceId: string } | null>(storageKey, null)
    if (saved) {
      setSelectedPlayer(saved.player)
      setHasVoted(true)
    }
  }, [])

  function handleVote() {
    if (!selectedPlayer) return
    const deviceId = getDeviceId()
    const storageKey = `${STORAGE_KEYS.MVP_VOTE_PREFIX}${eventId || 'general'}`
    setStoredValue(storageKey, { player: selectedPlayer, deviceId })
    setHasVoted(true)
  }

  const eventName = eventId
    ? tournamentResults.find(t => t.id === eventId)?.event || 'Event'
    : 'Season'

  return (
    <>
      <Header />

      <main id="main-content" className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: MOTION.ease.outExpo }}
            >
              <p className="text-section-heading mb-4">Live Vote</p>
              <h1 className="text-display mb-6">
                {eventName} <span className="text-heat-habanero">MVP</span>
              </h1>
              <p className="text-xl text-zinc-400">
                {hasVoted
                  ? 'Thanks for voting! Your pick has been recorded.'
                  : 'Cast your vote for the most valuable player. One vote per device.'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Player List */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <div className="max-w-lg mx-auto">
              {hasVoted ? (
                <motion.div
                  className="bg-zinc-900/30 rounded-xl border border-heat-bell/30 p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-display text-2xl uppercase text-heat-bell mb-2">
                    Vote Recorded
                  </h3>
                  <p className="text-zinc-400">
                    You voted for <span className="text-white font-medium">{selectedPlayer}</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-2"
                  initial="initial"
                  animate="animate"
                  transition={{ staggerChildren: 0.03 }}
                >
                  {players.map((player) => (
                    <motion.button
                      key={player}
                      type="button"
                      onClick={() => setSelectedPlayer(player)}
                      className={cn(
                        'w-full text-left p-4 rounded-xl border transition-all',
                        selectedPlayer === player
                          ? 'border-heat-habanero/50 bg-heat-habanero/10 text-white'
                          : 'border-zinc-800/50 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      )}
                      variants={MOTION.variants.slideUp}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-display text-lg uppercase">{player}</span>
                    </motion.button>
                  ))}

                  {/* Submit */}
                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      onClick={handleVote}
                      disabled={!selectedPlayer}
                      className={cn('btn-primary', !selectedPlayer && 'opacity-50 cursor-not-allowed')}
                    >
                      Cast Vote
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
