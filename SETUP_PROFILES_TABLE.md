# Setup Profiles Table

The `profiles` table is required for the avatar picker feature to work. Follow these steps to create it:

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/migrations/20240101000000_create_profiles_table.sql`
5. Click **Run** (or press Ctrl+Enter)
6. Verify the table was created by checking the **Table Editor** - you should see a `profiles` table

## Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Make sure you're in the project root directory
supabase db push
```

Or if you want to run the migration manually:

```bash
supabase migration up
```

## Verify the Table

After creating the table, verify it exists:

1. Go to **Table Editor** in Supabase dashboard
2. You should see a `profiles` table with the following columns:
   - `id` (uuid, primary key)
   - `user_id` (uuid, unique, references auth.users)
   - `avatar_id` (integer, default 1)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## Troubleshooting

If you still see errors after creating the table:

1. **Check Row Level Security (RLS)**: Make sure RLS is enabled and policies are created
2. **Check API permissions**: Ensure your Supabase API keys have the correct permissions
3. **Refresh your browser**: Sometimes a page refresh helps after creating the table
4. **Check browser console**: Look for any additional error messages

## What the Migration Does

- Creates the `profiles` table
- Sets up foreign key relationship with `auth.users`
- Creates an index on `user_id` for faster queries
- Enables Row Level Security (RLS)
- Creates RLS policies so users can only access their own profile
- Sets up automatic `updated_at` timestamp updates

