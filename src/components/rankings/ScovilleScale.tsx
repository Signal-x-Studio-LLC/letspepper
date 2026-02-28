import { cn } from '@/lib/utils'

export function ScovilleScale({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1" aria-label={`Scoville rating ${rating} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            'text-sm transition-opacity',
            i < rating ? 'opacity-100' : 'opacity-20'
          )}
          aria-hidden="true"
        >
          🌶️
        </span>
      ))}
    </div>
  )
}
