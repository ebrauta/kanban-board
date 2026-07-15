import type { ColumnId } from "./column"
import type { Priority } from "./priority"

export interface Task {
    id: string
    title: string
    description: string
    tag: string
    priority: Priority
    dueDate: string //format "YY-MM-DD"
    column: ColumnId
}