/**
 * Let's Pepper - Power Rankings Data
 * Editorial rankings with narrative blurbs and scoville ratings.
 */

export type Trend = 'up' | 'down' | 'steady' | 'new'

export interface PowerRanking {
  rank: number
  players: string[]
  scovilleRating: number // 1-5
  trend: Trend
  blurb: string
  highlights: string[]
}

export const powerRankings: PowerRanking[] = [
  {
    rank: 1,
    players: ['Charlie Podgorny', 'Nate Meyer'],
    scovilleRating: 5,
    trend: 'steady',
    blurb: 'The undisputed kings of the series. Two events, two golds. Podgorny and Meyer have been the backbone of both winning squads — the chemistry is undeniable.',
    highlights: ['2x Champions', 'Back-to-back 1st place', '200 season points each'],
  },
  {
    rank: 2,
    players: ['Casey Maas', 'Kyle Zediker', 'Kaden Sauer'],
    scovilleRating: 4,
    trend: 'up',
    blurb: 'The most consistent trio in the league. Bronze at both events with the exact same roster — they\'re dialed in and hungry for the top step.',
    highlights: ['2x Bronze medalists', 'Only team with same roster both events', '100 season points each'],
  },
  {
    rank: 3,
    players: ['Nick Maruyama', 'Zach Solomon', 'Lincoln Geist'],
    scovilleRating: 4,
    trend: 'down',
    blurb: 'Silver at the Bell Pepper, bronze at the Grass Launch. Talent is obvious — just need to find that final gear to dethrone the top dogs.',
    highlights: ['Silver + Bronze finishes', '125 total points each', 'Always in the mix'],
  },
  {
    rank: 4,
    players: ['Peter Zurawski'],
    scovilleRating: 3,
    trend: 'up',
    blurb: 'The Bell Pepper Open champion\'s secret weapon. Zurawski stepped up when it mattered most — now the question is can he run it back.',
    highlights: ['Bell Pepper Open Champion', '100 season points', 'One event, one title'],
  },
  {
    rank: 5,
    players: ['Everett Haynes', 'Will Mensching', 'Grant Veldman'],
    scovilleRating: 3,
    trend: 'up',
    blurb: 'From 9th at the Bell Pepper to silver at the Grass Launch — the biggest glow-up of the season. This squad is trending in the right direction.',
    highlights: ['Grass Launch silver medalists', 'Biggest improvement arc', '85 total points each'],
  },
  {
    rank: 6,
    players: ['Ian Schuller'],
    scovilleRating: 3,
    trend: 'new',
    blurb: 'One event. One chip. Schuller joined the Meyer/Podgorny squad for the Grass Launch and walked away a champion. Impact player.',
    highlights: ['Grass Launch Champion', '100 points in one event', 'Immediate impact'],
  },
  {
    rank: 7,
    players: ['Kevin Messer', 'Mark Mir', 'Grant Adler'],
    scovilleRating: 2,
    trend: 'steady',
    blurb: 'Consistently in the top half. T-5th at both events shows they belong — now it\'s about breaking through the semifinal barrier.',
    highlights: ['2x T-5th finishes', '50 total points each', 'Consistent competitors'],
  },
  {
    rank: 8,
    players: ['David Butler', 'Elijah Scott', 'Owen Randle'],
    scovilleRating: 2,
    trend: 'steady',
    blurb: 'Bronze-level talent with T-3rd at Bell Pepper and T-5th at Grass Launch. They\'ve proven they can hang with anyone on their day.',
    highlights: ['T-3rd at Bell Pepper', 'T-5th at Grass Launch', '75 total points each'],
  },
]

export const SEASON_STATS = {
  totalPointsAwarded: 1850,
  eventsCompleted: 2,
  teamsRanked: powerRankings.length,
}
