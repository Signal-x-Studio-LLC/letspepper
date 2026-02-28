export function PlaceBadge({ place }: { place: number }) {
  if (place === 1) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500">
        <span className="text-lg">🥇</span>
      </div>
    )
  }
  if (place === 2) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-400/20 text-zinc-400">
        <span className="text-lg">🥈</span>
      </div>
    )
  }
  if (place === 3) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-700/20 text-amber-600">
        <span className="text-lg">🥉</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-500">
      <span className="font-display text-sm">{place}</span>
    </div>
  )
}
