'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ScovilleScale } from './ScovilleScale'
import { TrendArrow } from './TrendArrow'
import type { PowerRanking } from '@/lib/rankings-data'

const heatAccentByRating: Record<number, string> = {
  5: 'border-l-heat-habanero',
  4: 'border-l-heat-jalapeno',
  3: 'border-l-heat-poblano',
  2: 'border-l-heat-bell',
  1: 'border-l-zinc-600',
}

export function PowerRankingCard({ ranking }: { ranking: PowerRanking }) {
  const accentClass = heatAccentByRating[ranking.scovilleRating] || 'border-l-zinc-600'

  return (
    <motion.div
      className={cn(
        'bg-zinc-900/30 rounded-xl border border-zinc-800/50 border-l-4 p-6',
        accentClass
      )}
      variants={MOTION.variants.slideUp}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Rank number */}
        <div className="flex-shrink-0">
          <span className="font-display text-4xl sm:text-5xl text-zinc-600">
            #{ranking.rank}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Team name + trend */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-display text-xl sm:text-2xl uppercase text-white">
              {ranking.players.join(' / ')}
            </h3>
            <TrendArrow trend={ranking.trend} />
          </div>

          {/* Scoville + points */}
          <div className="flex items-center gap-4 mb-3">
            <ScovilleScale rating={ranking.scovilleRating} />
          </div>

          {/* Blurb */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            {ranking.blurb}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {ranking.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 rounded-full text-xs font-accent uppercase tracking-wider bg-zinc-800/50 text-zinc-400 border border-zinc-700/50"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
