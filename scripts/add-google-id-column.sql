-- Add googleId column to users table
ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
