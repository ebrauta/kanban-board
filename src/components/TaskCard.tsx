import { useState, type DragEvent, type FC } from "react"
import type { Task } from "@/models"
import { formatDate, isOverdue } from "@/utils/date"
import { Flag, Pencil, Trash2 } from 'lucide-react'
import { clsx } from "clsx"
import Badge from "./ui/Badge"
import IconButton from "./ui/IconButton"

interface TaskCardProps {
    task: Task
    onEdit: (task: Task) => void
    onDelete: (id: string) => void
}

const priorityIconColor: Record<Task['priority'], string> = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600'
}

const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    const overdue = isOverdue(task.dueDate);
    const [isDragging, setIsDraggind] = useState<boolean>(false)

    function handleDragStart(event: DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData('text/plain', task.id)
        event.dataTransfer.effectAllowed = 'move'
        setIsDraggind(true)
    }
    function handleDragEnd() {
        setIsDraggind(false)
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={clsx(
                "group bg-white rounded-lg shadow-sm hover:shadow-md tramsition-shadow p-4 flex flex-col gap-2",
                isDragging && 'opacity-40'
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-800">{task.title}</h3>
                <Flag size={16} className={clsx('shrink-0 mt-1', priorityIconColor[task.priority])} fill="currentColor" />
            </div>
            <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
            <div className="flex items-center justify-between mt-2">
                <Badge variant="tag">{task.tag}</Badge>
                <span className={clsx('text-xs', overdue ? 'text-red-600 font-medium' : 'text-slate-400')}>
                    {formatDate(task.dueDate)}
                </span>
            </div>
            <div className="flex gap-2 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity justify-end">
                <IconButton
                    icon={<Pencil size={16} />}
                    aria-label="Editar tarefa"
                    onClick={() => onEdit(task)}
                />
                <IconButton
                    icon={<Trash2 size={16} />}
                    aria-label="Excluir tarefa"
                    variant="danger"
                    onClick={() => onDelete(task.id)}
                />
            </div>
        </div >
    )
}

export default TaskCard