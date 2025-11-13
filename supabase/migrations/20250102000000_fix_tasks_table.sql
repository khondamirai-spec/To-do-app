-- Fix tasks table schema to match code expectations
-- Rename 'name' column to 'title'
ALTER TABLE tasks RENAME COLUMN name TO title;

-- Add missing columns
ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS date TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD');

-- Create index on date for faster lookups
CREATE INDEX IF NOT EXISTS tasks_date_idx ON tasks(date);

-- Create index on completed for faster filtering
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON tasks(completed);

