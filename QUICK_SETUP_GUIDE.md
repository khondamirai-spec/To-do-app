# Quick Setup Guide - Create Profiles Table

## Step-by-Step Instructions

### Method 1: Using Supabase Dashboard (Easiest)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `mbszimpqkeukkyorajar`

2. **Open SQL Editor**
   - Click on **"SQL Editor"** in the left sidebar (icon looks like a terminal/console)

3. **Create New Query**
   - Click the **"New Query"** button (top right)

4. **Copy the SQL**
   - Open the file `CREATE_PROFILES_TABLE.sql` in this project
   - Select ALL the text (Ctrl+A / Cmd+A)
   - Copy it (Ctrl+C / Cmd+C)

5. **Paste and Run**
   - Paste the SQL into the SQL Editor
   - Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for "Success" message

6. **Verify**
   - Go to **"Table Editor"** in the left sidebar
   - You should see a table called `profiles`
   - It should have columns: `id`, `user_id`, `avatar_id`, `created_at`, `updated_at`

7. **Refresh Your App**
   - Go back to your app and refresh the page
   - The error should be gone!

### Method 2: Using Supabase CLI (If you have it installed)

```bash
# Navigate to your project directory
cd /path/to/task_do_list-1

# If you have Supabase CLI linked to your project:
supabase db push

# Or run the migration directly:
supabase migration up
```

## Troubleshooting

### If you get an error about "relation already exists"
- The table might already exist. Check the Table Editor to confirm.
- If it exists but still shows errors, try refreshing your browser.

### If you get permission errors
- Make sure you're using the correct Supabase project
- Check that your API keys are correct in `.env.local`

### If the table still doesn't appear
1. Check the SQL Editor for any error messages
2. Make sure you ran ALL the SQL (not just part of it)
3. Try refreshing the Table Editor page
4. Check browser console for additional errors

## What This Table Does

- Stores each user's selected avatar (1-4)
- Automatically links to the user's account
- Secures data with Row Level Security (RLS)
- Updates timestamps automatically

## Need Help?

If you're still having issues:
1. Check that all SQL statements ran successfully
2. Verify the table appears in Table Editor
3. Make sure your `.env.local` has the correct Supabase URL and keys
4. Try logging out and back in after creating the table

