-- =============================================================================
-- Let's Pepper V2: Seed Hot Takes
-- 12 pre-seeded takes from V1, marked as approved seeds.
-- Uses a nil UUID for device_id since these are system-generated.
-- =============================================================================

INSERT INTO lp_hot_takes (device_id, text, author, heat, status, is_seed) VALUES
  ('00000000-0000-0000-0000-000000000000',
   'Podgorny and Meyer aren''t just the best duo — they might be the best team in Illinois grass volleyball. Period.',
   'Anonymous', 'habanero', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'The Vandenberg brothers would win if they played every weekend. Raw talent is there — they just need reps.',
   'Anonymous', 'jalapeno', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Maas, Zediker, and Sauer are the most underrated team in the series. Two bronzes isn''t luck — it''s consistency.',
   'Anonymous', 'poblano', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Let''s Pepper needs a doubles division. Triples is great but 2v2 grass would go crazy.',
   'Anonymous', 'bell', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'The 9th-to-2nd comeback by Haynes/Mensching/Veldman is the best storyline in Let''s Pepper history.',
   'Anonymous', 'jalapeno', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'There should be a consolation bracket with its own prize. Give every team a reason to keep competing.',
   'Anonymous', 'bell', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Ian Schuller is the biggest "what if" — one event, one championship. What happens with a full season?',
   'Anonymous', 'habanero', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Grass volleyball > beach volleyball. The dives are crazier, the rallies are longer, and the vibes are better.',
   'Anonymous', 'reaper', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'The Poblano Open is going to have the most competitive field yet. Everyone''s been training.',
   'Anonymous', 'poblano', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Let''s Pepper is what happens when volleyball people actually care about the player experience. More of this.',
   'Anonymous', 'bell', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'Nick Maruyama is the best pure volleyball player in the series but needs a championship to prove it.',
   'Anonymous', 'habanero', 'approved', true),

  ('00000000-0000-0000-0000-000000000000',
   'The Flickday Media coverage is what separates Let''s Pepper from every other grass tournament. Content matters.',
   'Anonymous', 'bell', 'approved', true);
