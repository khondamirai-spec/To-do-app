import { supabase } from './supabase';

export type Priority = 'High' | 'Medium' | 'Low';

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  priority: Priority;
  date: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

type TaskInsertInput = {
  title: string;
  description?: string;
  priority: Priority;
  date: string;
};

type TaskUpdateInput = {
  title?: string;
  description?: string;
  priority?: Priority;
  date?: string;
  completed?: boolean;
};

// Simple helper to get user ID
async function getUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('User is not authenticated');
  }
  return user.id;
}

export async function getTasks(): Promise<Task[]> {
  const userId = await getUserId();
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load tasks: ${error.message}`);
  }

  return data ?? [];
}

export async function getCompletedTasks(): Promise<Task[]> {
  const userId = await getUserId();
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)
    .order('completed_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load completed tasks: ${error.message}`);
  }

  return data ?? [];
}

export async function createTask({
  title,
  description,
  priority,
  date,
}: TaskInsertInput): Promise<Task> {
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User is not authenticated');
  }

  // Simple direct insert to Supabase
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title: title,
      description: description || null,
      priority: priority,
      date: date,
      completed: false,
      completed_at: null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  if (!data) {
    throw new Error('Task was not created');
  }

  return data;
}

export async function updateTask(
  id: string,
  updates: TaskUpdateInput,
): Promise<Task> {
  const userId = await getUserId();

  // Build update payload
  const payload: any = {};
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.description !== undefined) payload.description = updates.description || null;
  if (updates.priority !== undefined) payload.priority = updates.priority;
  if (updates.date !== undefined) payload.date = updates.date;
  if (updates.completed !== undefined) {
    payload.completed = updates.completed;
    payload.completed_at = updates.completed ? new Date().toISOString() : null;
  }

  if (Object.keys(payload).length === 0) {
    throw new Error('No updates provided');
  }

  // Simple direct update to Supabase
  const { data, error } = await supabase
    .from('tasks')
    .update(payload)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }

  if (!data) {
    throw new Error('Task was not updated');
  }

  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const userId = await getUserId();

  // Simple direct delete from Supabase
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

// Backwards compatibility for places that still import getMyTasks
export const getMyTasks = getTasks;
