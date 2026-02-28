import { cn } from '@/lib/utils'
import type { Trend } from '@/lib/rankings-data'

const trendConfig: Record<Trend, { icon: string; label: string; color: string }> = {
  up: { icon: '▲', label: 'Trending up', color: 'text-heat-bell' },
  down: { icon: '▼', label: 'Trending down', color: 'text-heat-habanero' },
  steady: { icon: '—', label: 'Steady', color: 'text-zinc-500' },
  new: { icon: '★', label: 'New entry', color: 'text-heat-poblano' },
}

export function TrendArrow({ trend }: { trend: Trend }) {
  const config = trendConfig[trend]
  return (
    <span
      className={cn('font-accent text-xs', config.color)}
      aria-label={config.label}
      title={config.label}
    >
      {config.icon}
    </span>
  )
}
