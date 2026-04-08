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
  const [tallies, setTallies] = useState<Record<string, number>>({})

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

  // Fetch tallies after voting
  useEffect(() => {
    if (!hasVoted) return
    const scope = `mvp:${eventId || 'general'}`
    fetch(`/api/votes?scope=${scope}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.tallies?.[scope]) setTallies(data.tallies[scope])
      })
      .catch(() => {})
  }, [hasVoted, eventId])

  function handleVote() {
    if (!selectedPlayer) return
    const deviceId = getDeviceId()
    const storageKey = `${STORAGE_KEYS.MVP_VOTE_PREFIX}${eventId || 'general'}`
    setStoredValue(storageKey, { player: selectedPlayer, deviceId })
    setHasVoted(true)

    // Submit to API
    fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: deviceId,
        scope: `mvp:${eventId || 'general'}`,
        choice: selectedPlayer,
      }),
    }).catch(() => {})
  }

  const eventName = eventId
    ? tournamentResults.find(t => t.id === eventId)?.event || 'Event'
    : 'Season'

  // Sort players by vote count when showing results
  const sortedPlayers = hasVoted && Object.keys(tallies).length > 0
    ? [...players].sort((a, b) => (tallies[b] || 0) - (tallies[a] || 0))
    : players

  const totalVotes = Object.values(tallies).reduce((a, b) => a + b, 0)

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
                  className="space-y-2"
                  initial="initial"
                  animate="animate"
                  transition={{ staggerChildren: 0.03 }}
                >
                  {/* Confirmation banner */}
                  <motion.div
                    className="bg-zinc-900/30 rounded-xl border border-heat-bell/30 p-6 text-center mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-zinc-400 text-sm">
                      You voted for <span className="text-white font-medium">{selectedPlayer}</span>
                    </p>
                    {totalVotes > 0 && (
                      <p className="text-xs text-zinc-600 font-accent mt-1">
                        {totalVotes} total votes
                      </p>
                    )}
                  </motion.div>

                  {/* Ranked results */}
                  {sortedPlayers.map((player, i) => {
                    const count = tallies[player] || 0
                    const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
                    if (count === 0 && totalVotes > 0) return null

                    return (
                      <motion.div
                        key={player}
                        className={cn(
                          'p-4 rounded-xl border transition-all',
                          selectedPlayer === player
                            ? 'border-heat-habanero/50 bg-heat-habanero/10'
                            : 'border-zinc-800/50 bg-zinc-900/30'
                        )}
                        variants={MOTION.variants.slideUp}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-600 font-accent text-xs w-5">{i + 1}.</span>
                            <span className={cn('font-display text-lg uppercase', selectedPlayer === player ? 'text-white' : 'text-zinc-300')}>
                              {player}
                            </span>
                          </div>
                          <span className="text-zinc-500 font-accent text-xs">{count} votes</span>
                        </div>
                        {totalVotes > 0 && (
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden ml-8">
                            <motion.div
                              className="h-full bg-heat-habanero rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: MOTION.ease.outExpo }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
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
