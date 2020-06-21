CREATE TABLE filters (
  metrics_id serial PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  metrics TEXT[],
  ordering_key TEXT,
  ordering_order TEXT
)
