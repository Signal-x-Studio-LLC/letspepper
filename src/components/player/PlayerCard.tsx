'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/motion'
import { getPlayerStats } from '@/lib/standings-data'
import { ScovilleScale } from '@/components/rankings/ScovilleScale'

function getHeatRating(points: number): number {
  if (points >= 175) return 5
  if (points >= 125) return 4
  if (points >= 75) return 3
  if (points >= 25) return 2
  return 1
}

export function PlayerCard({ playerName }: { playerName: string }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const stats = getPlayerStats(playerName)
  const heatRating = getHeatRating(stats.seasonPoints)

  return (
    <div
      className="relative aspect-[2/3] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped) }}
      tabIndex={0}
      role="button"
      aria-label={`${playerName} player card — click to flip`}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={MOTION.spring.snappy}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5 flex flex-col justify-between',
            'backface-hidden'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Silhouette placeholder */}
          <div className="flex-1 flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center">
              <span className="text-3xl text-zinc-600">👤</span>
            </div>
          </div>

          {/* Player name */}
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl uppercase text-white leading-tight">
              {playerName}
            </h3>
            <ScovilleScale rating={heatRating} />
          </div>

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-center p-2 rounded-lg bg-zinc-800/30">
              <p className="font-display text-lg text-white">{stats.events}</p>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500">Events</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-800/30">
              <p className="font-display text-lg text-heat-jalapeno">{stats.seasonPoints}</p>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500">Points</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-800/30">
              <p className="font-display text-lg text-white">{stats.bestFinish > 0 ? `#${stats.bestFinish}` : '—'}</p>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500">Best</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-800/30">
              <p className="font-display text-lg text-heat-poblano">{stats.podiums}</p>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500">Podiums</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-zinc-600 mt-3 font-accent uppercase tracking-wider">
            Tap to flip
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5 flex flex-col',
            'backface-hidden'
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-display text-lg uppercase text-white mb-4 text-center">
            {playerName}
          </h3>

          <div className="flex-1 space-y-3">
            <div>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Season Points</p>
              <p className="font-display text-2xl text-heat-jalapeno">{stats.seasonPoints}</p>
            </div>

            <div>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Results</p>
              <div className="space-y-1">
                {stats.placements.map((p) => (
                  <div key={p.eventId} className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate mr-2">
                      {p.eventId.includes('bell') ? 'Bell Pepper' : 'Grass Launch'}
                    </span>
                    <span className="text-white font-accent">{p.place}{p.place === 1 ? 'st' : p.place === 2 ? 'nd' : p.place === 3 ? 'rd' : 'th'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-accent text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Stats</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-zinc-500">Wins</span>
                <span className="text-white text-right">{stats.wins}</span>
                <span className="text-zinc-500">Podiums</span>
                <span className="text-white text-right">{stats.podiums}</span>
                <span className="text-zinc-500">Events</span>
                <span className="text-white text-right">{stats.events}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] text-zinc-600 mt-3 font-accent uppercase tracking-wider">
            Tap to flip
          </p>
        </div>
      </motion.div>
    </div>
  )
}
