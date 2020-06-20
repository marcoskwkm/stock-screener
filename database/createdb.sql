CREATE TABLE metrics (
  metrics_id serial PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  metrics_list TEXT[]
)
