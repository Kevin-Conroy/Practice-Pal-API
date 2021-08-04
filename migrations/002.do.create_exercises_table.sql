CREATE TABLE IF NOT EXISTS exercises (
 id SERIAL,
 name VARCHAR,
 current_tempo INTEGER NOT NULL,
 goal_tempo INTEGER NOT NULL,
 user_id INTEGER NOT NULL
);