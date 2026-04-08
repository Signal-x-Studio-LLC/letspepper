-- =============================================================================
-- Let's Pepper V2: Engagement Tables
-- Run against Supabase SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. lp_votes — unified votes for awards, MVP, photo
-- ---------------------------------------------------------------------------
CREATE TABLE lp_votes (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  device_id  UUID NOT NULL,
  scope      TEXT NOT NULL,        -- e.g. 'awards:mvp', 'mvp:bell-pepper-2025', 'photo:season-2025'
  choice     TEXT NOT NULL,        -- nominee id, player name, or photo id
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (device_id, scope)
);

CREATE INDEX idx_lp_votes_scope_choice ON lp_votes (scope, choice);

-- ---------------------------------------------------------------------------
-- 2. lp_hot_takes — user-submitted takes with approval queue
-- ---------------------------------------------------------------------------
CREATE TABLE lp_hot_takes (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  device_id  UUID NOT NULL,
  text       TEXT NOT NULL CHECK (char_length(text) BETWEEN 1 AND 280),
  author     TEXT NOT NULL DEFAULT 'Anonymous',
  heat       TEXT NOT NULL CHECK (heat IN ('bell', 'poblano', 'jalapeno', 'habanero', 'reaper')),
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_seed    BOOLEAN NOT NULL DEFAULT false,
  fire_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lp_hot_takes_status_date ON lp_hot_takes (status, created_at DESC);

-- ---------------------------------------------------------------------------
-- 3. lp_hot_take_reactions — fire reaction toggles
-- ---------------------------------------------------------------------------
CREATE TABLE lp_hot_take_reactions (
  id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  device_id UUID NOT NULL,
  take_id   BIGINT NOT NULL REFERENCES lp_hot_takes (id) ON DELETE CASCADE,
  UNIQUE (device_id, take_id)
);

-- ---------------------------------------------------------------------------
-- 4. lp_prediction_picks — prediction picks + nickname + score
-- ---------------------------------------------------------------------------
CREATE TABLE lp_prediction_picks (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  device_id  UUID NOT NULL,
  event_id   TEXT NOT NULL,
  nickname   TEXT CHECK (nickname IS NULL OR char_length(nickname) BETWEEN 1 AND 30),
  picks      JSONB NOT NULL,       -- { propId: optionIndex }
  score      INT,                  -- null until scored
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (device_id, event_id)
);

CREATE INDEX idx_lp_prediction_picks_leaderboard ON lp_prediction_picks (event_id, score DESC NULLS LAST);

-- ---------------------------------------------------------------------------
-- 5. lp_quiz_tallies — aggregate personality counts (5 rows total)
-- ---------------------------------------------------------------------------
CREATE TABLE lp_quiz_tallies (
  personality TEXT PRIMARY KEY CHECK (personality IN ('bell', 'serrano', 'chipotle', 'habanero', 'reaper')),
  count       INT NOT NULL DEFAULT 0
);

-- Pre-populate with zero counts
INSERT INTO lp_quiz_tallies (personality)
VALUES ('bell'), ('serrano'), ('chipotle'), ('habanero'), ('reaper');

-- ---------------------------------------------------------------------------
-- SQL Functions
-- ---------------------------------------------------------------------------

-- Atomic increment fire_count
CREATE OR REPLACE FUNCTION lp_increment_fire(p_take_id BIGINT)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE lp_hot_takes SET fire_count = fire_count + 1 WHERE id = p_take_id;
$$;

-- Atomic decrement fire_count (floor at 0)
CREATE OR REPLACE FUNCTION lp_decrement_fire(p_take_id BIGINT)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE lp_hot_takes SET fire_count = GREATEST(fire_count - 1, 0) WHERE id = p_take_id;
$$;

-- Atomic increment quiz tally
CREATE OR REPLACE FUNCTION lp_increment_quiz_tally(p_personality TEXT)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE lp_quiz_tallies SET count = count + 1 WHERE personality = p_personality;
$$;
