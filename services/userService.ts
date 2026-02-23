import { User } from '../types/user';
import { db } from './db';

export const getUser = (): User | null => {
  try {
    const result = db.getFirstSync<User>('SELECT * FROM users LIMIT 1');
    return result || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const createUser = (name: string, image?: string): User | null => {
  try {
    const result = db.runSync('INSERT INTO users (name, image) VALUES (?, ?)', name, image || null);
    if (result.lastInsertRowId) {
      return { id: result.lastInsertRowId, name, image: image || '' };
    }
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = (name: string): boolean => {
    try {
        db.runSync('UPDATE users SET name = ? WHERE id = (SELECT id FROM users LIMIT 1)', name);
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false;
    }
};

export const updateUserImage = (image: string): boolean => {
    try {
        db.runSync('UPDATE users SET image = ? WHERE id = (SELECT id FROM users LIMIT 1)', image);
        return true;
    } catch (error) {
        console.error('Error updating user image:', error);
        return false;
    }
};
