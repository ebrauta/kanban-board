import type { FC } from "react"
import { COLUMN_LABELS, type ColumnId, type Task } from "../models"
import { Inbox } from "lucide-react"
import TaskCard from "./TaskCard"

interface ColumnProps {
    columnId: ColumnId
    tasks: Task[]
    onEditTask: (task: Task) => void
    onDeleteTask: (id: string) => void
}

const Column: FC<ColumnProps> = ({ columnId, tasks, onEditTask, onDeleteTask }) => {
    return (
        <div className="bg-slate-100 rounded-xl p-3 flex flex-col gap-3 w-full min-w-0">
            <h2 className="font-semibold text-slate-700 px-1">
                {COLUMN_LABELS[columnId]}{' '}
                <span className="text-slate-400 font-normal">({tasks.length})</span>
            </h2>
            <div className="flex flex-col gap-2 min-h-[100px]">
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400 py-8">
                        <Inbox size={28} />
                        <p className="text-sm">Nenhuma tarefa</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Column