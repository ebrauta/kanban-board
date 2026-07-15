import { type Task } from '../src/models';

const STORAGE_KEY = 'kanban-board:tasks'

/**
 * Lê as tasks do localStorage.
 * Em caso de erro (dado corrompido, localStorage indisponível), retorna array vazio.
 */
export function getTasks(): Task[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        return JSON.parse(raw) as Task[]
    } catch (error) {
        console.error("Failed to read tasks from storage: ", error)
        return []
    }
}

/**
 * Sobrescreve as tasks no localStorage.
 * Em caso de erro (quota excedida, modo privado bloqueando), falha silenciosamente
 * e avisa no console — a UI continua funcionando em memória mesmo sem persistir.
 */

export function saveTasks(tasks: Task[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
        console.error("Failed to save tasks to storage:", error)
    }
}