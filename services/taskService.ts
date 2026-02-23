import { Task } from '../types/task';
import { db } from './db';

export const getTasks = (active: boolean = true): Task[] => {
  try {
    const isFinished = active ? 0 : 1;
    const tasks = db.getAllSync<Task>(
      `SELECT * FROM tasks WHERE isFinished = ? ORDER BY createdAt DESC`,
      isFinished
    );
    return tasks.map(task => ({
      ...task,
      isFinished: Boolean(task.isFinished)
    }));
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const addTask = (title: string, description: string): Task | null => {
  try {
    const result = db.runSync(
      'INSERT INTO tasks (title, description, isFinished) VALUES (?, ?, ?)',
      title,
      description,
      0
    );
    if (result.lastInsertRowId) {
       const newTask = db.getFirstSync<Task>('SELECT * FROM tasks WHERE id = ?', result.lastInsertRowId);
       return newTask ? { ...newTask, isFinished: Boolean(newTask.isFinished) } : null;
    }
    return null;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const updateTask = (id: number, title: string, description: string): boolean => {
  try {
    db.runSync(
      'UPDATE tasks SET title = ?, description = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      title,
      description,
      id
    );
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

export const toggleTaskStatus = (id: number, isFinished: boolean): boolean => {
    try {
        db.runSync(
            'UPDATE tasks SET isFinished = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            isFinished ? 1 : 0,
            id
        );
        return true;
    } catch (error) {
        console.error('Error toggling task status:', error);
        return false;
    }
}


export const deleteTask = (id: number): boolean => {
  try {
    db.runSync('DELETE FROM tasks WHERE id = ?', id);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

export const recoverTask = (id: number): boolean => {
    return toggleTaskStatus(id, false);
}
