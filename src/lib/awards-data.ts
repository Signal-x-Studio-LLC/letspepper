/**
 * Let's Pepper - Pepper Awards Data
 * Fan-voted award categories and nominees.
 */

export interface Nominee {
  id: string
  name: string
  reason: string
}

export interface AwardCategory {
  id: string
  name: string
  pepperName: string
  description: string
  heat: 'bell' | 'jalapeno' | 'poblano' | 'habanero' | 'reaper'
  nominees: Nominee[]
}

export const awardCategories: AwardCategory[] = [
  {
    id: 'mvp',
    name: 'Most Valuable Player',
    pepperName: 'Ghost Pepper Award',
    description: 'The player who dominated the season. Pure impact.',
    heat: 'habanero',
    nominees: [
      { id: 'charlie', name: 'Charlie Podgorny', reason: '2x Champion — the backbone of both winning squads' },
      { id: 'nate', name: 'Nate Meyer', reason: '2x Champion — consistent excellence across both events' },
      { id: 'casey', name: 'Casey Maas', reason: '2x Bronze — the most consistent performer in the series' },
      { id: 'nick', name: 'Nick Maruyama', reason: 'Silver + Bronze — always in the mix at the top' },
    ],
  },
  {
    id: 'improved',
    name: 'Most Improved',
    pepperName: 'Jalapeño Award',
    description: 'The player or team that leveled up the most between events.',
    heat: 'jalapeno',
    nominees: [
      { id: 'everett', name: 'Everett Haynes', reason: '9th → 2nd place — the biggest jump of the season' },
      { id: 'will', name: 'Will Mensching', reason: '9th → 2nd place — glow-up squad member' },
      { id: 'grant-v', name: 'Grant Veldman', reason: '9th → 2nd place — proved the doubters wrong' },
    ],
  },
  {
    id: 'sportsmanship',
    name: 'Best Sportsmanship',
    pepperName: 'Chipotle Award',
    description: 'The player who competed hard but kept it classy. Respect on and off the court.',
    heat: 'poblano',
    nominees: [
      { id: 'kyle', name: 'Kyle Zediker', reason: 'Consistent competitor with a clean game' },
      { id: 'david', name: 'David Butler', reason: 'Always playing fair, always respectful' },
      { id: 'sam', name: 'Sam Kharasch', reason: 'Great energy, great attitude, every match' },
      { id: 'kevin', name: 'Kevin Messer', reason: 'The definition of a team player' },
    ],
  },
  {
    id: 'performance',
    name: 'Best Single Performance',
    pepperName: 'Habanero Award',
    description: 'One match, one moment, one performance that defined the season.',
    heat: 'habanero',
    nominees: [
      { id: 'peter', name: 'Peter Zurawski', reason: 'Bell Pepper Open championship performance' },
      { id: 'ian', name: 'Ian Schuller', reason: 'Grass Launch championship — instant impact' },
      { id: 'charlie-perf', name: 'Charlie Podgorny', reason: 'Dominant across both finals appearances' },
      { id: 'everett-perf', name: 'Everett Haynes', reason: 'Grass Launch silver medal run from 9th seed' },
    ],
  },
  {
    id: 'fun',
    name: 'Most Fun Team',
    pepperName: 'Bell Pepper Award',
    description: 'The team that brought the best energy, win or lose.',
    heat: 'bell',
    nominees: [
      { id: 'team-vandenberg', name: 'Vandenberg Bros', reason: 'Kurt, Brett & Caleb — family affair with maximum vibes' },
      { id: 'team-messer', name: 'Messer / Mir / Adler', reason: 'Consistent competitors who keep it fun' },
      { id: 'team-watkins', name: 'Watkins / Cebula / Tripp', reason: 'Great sideline energy all day' },
      { id: 'team-blankschein', name: 'Blankschein / McCarthy / Hellman', reason: 'Always in good spirits' },
    ],
  },
]

/** Whether results are revealed (admin toggle) */
export const AWARDS_RESULTS_REVEALED = false
