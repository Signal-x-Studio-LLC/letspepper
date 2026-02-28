/**
 * Let's Pepper - Heat Configuration
 * Shared heat level system used across all pages and components.
 */

export type HeatLevel = 'bell' | 'poblano' | 'jalapeno' | 'habanero' | 'reaper'

export interface HeatConfig {
  color: string
  textClass: string
  borderClass: string
  bgClass: string
  level: string
  bars: number
}

export const HEAT_CONFIG: Record<HeatLevel, HeatConfig> = {
  bell: {
    color: 'var(--heat-bell)',
    textClass: 'text-heat-bell',
    borderClass: 'border-heat-bell',
    bgClass: 'bg-heat-bell',
    level: 'Mild',
    bars: 1,
  },
  poblano: {
    color: 'var(--heat-poblano)',
    textClass: 'text-heat-poblano',
    borderClass: 'border-heat-poblano',
    bgClass: 'bg-heat-poblano',
    level: 'Medium',
    bars: 2,
  },
  jalapeno: {
    color: 'var(--heat-jalapeno)',
    textClass: 'text-heat-jalapeno',
    borderClass: 'border-heat-jalapeno',
    bgClass: 'bg-heat-jalapeno',
    level: 'Hot',
    bars: 3,
  },
  habanero: {
    color: 'var(--heat-habanero)',
    textClass: 'text-heat-habanero',
    borderClass: 'border-heat-habanero',
    bgClass: 'bg-heat-habanero',
    level: 'Very Hot',
    bars: 4,
  },
  reaper: {
    color: '#dc2626',
    textClass: 'text-red-600',
    borderClass: 'border-red-600',
    bgClass: 'bg-red-600',
    level: 'Extreme',
    bars: 5,
  },
}
