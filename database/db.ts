import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("grocerieslist.db", {
    useNewConnection: true,
});

export async function initDatabase() {
    try {
        await (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    label TEXT NOT NULL,
                    category TEXT NOT NULL,
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME NOT NULL
                    description TEXT NOT NULL,
                ),

        CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY
                    name TEXT NOT NULL
                    image TEXT NOT NULL

        )
        `);
    } catch (error) {
        console.error("Error with the SQLite")
    }
}