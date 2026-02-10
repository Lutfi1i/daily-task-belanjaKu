import { db } from "@/database/db";
import { Tasks } from "@/types/task";
import { Alert } from "react-native";

    export async function loadsTask() {
        try {
            const result =  (await db).getAllAsync<Tasks>(
                `SELECT * FROM tasks ORDER BY id DESC`
            );
            return result
        } catch (e) {
        Alert.alert("Gagal memuat data tugas")
        }
        return []
    }

    export async function deleteTask(id: number): Promise<boolean> {
        try {
            (await db).runAsync(
                `DELETE FROM tasks WHERE id = ?`, 
                [id]);
            return true;

        } catch (e) {
            Alert.alert("Terjadi masalah saat menghapus tugas mu");
            return false;
        }
    }

    export async function addTask(payload: Tasks): Promise<Boolean> {
        try {
            (await db).runAsync(
                `INSERT INTO tasks (
                title, label, category, created_at, updated_at, description) VALUES
                (?, ?, ?, ?, ?, ?)`, [
                    payload.title,
                    payload.label,
                    payload.category,
                    payload.createdAt?.toISOString() || new Date().toISOString(),
                    payload.updatedAt?.toISOString() || new Date().toISOString(),
                    payload.description,
                ]
            );
            return true;
        } catch (error) {
            Alert.alert("Terjadi kesalahan saat menambah tugas")
            return false;
        }
    }

    export async function updateTasks(id: number, payload: Tasks): Promise<Boolean> {
        try {
            (await db).runAsync(
                `UPDATE tasks SET title = ?, label = ?, category = ?, created_at = ?, updated_at = ?, description = ? WHERE id = ?`,
                [
                    payload.title,
                    payload.label,
                    payload.category,
                    payload.createdAt?.toISOString() || new Date().toISOString(),
                    payload.updatedAt?.toISOString() || new Date().toISOString(),
                    payload.description,
                    id,
                ]
            )
            return true
        } catch (error) {
            Alert.alert("Terjadi kesalahan saat mengupdate data")
            return false
        }
    }


