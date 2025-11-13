export type Priority = 'High' | 'Medium' | 'Low'

export type Task = {
  id: string
  user_id: string
  title: string
  description?: string | null
  priority: Priority
  date: string
  completed: boolean
  completed_at?: string | null
  created_at?: string
  updated_at?: string
}

// Stub implementations - Supabase removed
// These functions return empty arrays or throw errors

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  return {
    success: false,
    message: 'Database connection removed. Supabase has been removed from this project.'
  }
}

export async function getTasks(): Promise<Task[]> {
  console.warn('getTasks: Database removed, returning empty array')
  return []
}

export async function getAllTasks(): Promise<Task[]> {
  console.warn('getAllTasks: Database removed, returning empty array')
  return []
}

export async function getTasksByDate(date: string): Promise<Task[]> {
  console.warn('getTasksByDate: Database removed, returning empty array')
  return []
}

export async function getCompletedTasks(): Promise<Task[]> {
  console.warn('getCompletedTasks: Database removed, returning empty array')
  return []
}

export async function createTask(task: {
  title: string
  description?: string
  priority: Priority
  date: string
}): Promise<Task> {
  throw new Error('Database removed. Cannot create tasks. Supabase has been removed from this project.')
}

export async function updateTask(
  id: string,
  updates: {
    title?: string
    description?: string
    priority?: Priority
    date?: string
    completed?: boolean
  }
): Promise<Task> {
  throw new Error('Database removed. Cannot update tasks. Supabase has been removed from this project.')
}

export async function deleteTask(id: string): Promise<void> {
  throw new Error('Database removed. Cannot delete tasks. Supabase has been removed from this project.')
}
