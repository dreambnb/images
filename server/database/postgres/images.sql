
CREATE TABLE IF NOT EXISTS locations (
  id serial PRIMARY KEY NOT NULL,
  name text NOT NULL,
  images json NOT NULL
);