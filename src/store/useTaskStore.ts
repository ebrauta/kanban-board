import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid'
import type { Task } from "../models";
import { getTasks, saveTasks } from "../services/taskStorage";
import { seedTasks } from "./seed";

interface TaskAttributes {
    tasks: Task[]
    searchText: string
}

interface TaskMethods {
    setSearchText: (text: string) => void
    addTask: (task: Omit<Task, 'id'>) => void
    updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void
    deleteTask: (id: string) => void
    moveTask: (id: string, newColumn: Task['column']) => void
    getFilteredTasks: () => Task[]
}

const storedTasks = getTasks();

const useTaskStore = create<TaskAttributes & TaskMethods>((set, get) => ({
    tasks: storedTasks.length > 0 ? storedTasks : seedTasks,
    searchText: '',
    setSearchText: (text) => set({ searchText: text }),
    addTask: (taskData) => set((state) => {
        const newTask: Task = { ...taskData, id: uuidv4() }
        const updated = [...state.tasks, newTask]
        saveTasks(updated)
        return { tasks: updated }
    }),
    updateTask: (id, updates) => set((state) => {
        const updated = state.tasks.map((task) => task.id === id ? { ...task, ...updates } : task)
        console.log(id)
        console.log(updates)
        console.log(updated)
        saveTasks(updated)
        return { tasks: updated }
    }),
    deleteTask: (id) => set((state) => {
        const updated = state.tasks.filter((task) => task.id !== id)
        saveTasks(updated)
        return { tasks: updated }
    }),
    moveTask: (id, newColumn) => set((state) => {
        const updated = state.tasks.map((task) => task.id === id ? { ...task, column: newColumn } : task)
        saveTasks(updated)
        return { tasks: updated }
    }),
    getFilteredTasks: () => {
        const { tasks, searchText } = get()
        if (!searchText.trim()) return tasks
        const lower = searchText.toLowerCase();
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(lower) ||
            task.tag.toLowerCase().includes(lower)
        )
    }
}))

export default useTaskStore