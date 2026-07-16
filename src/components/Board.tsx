import { useState, type FC } from "react";
import type { Task, ColumnId } from "../models";
import useTaskStore from "../store/useTaskStore";
import Column from "./Column";

const COLUMN_ORDER: ColumnId[] = ['todo', 'in-progress', 'done']

const Board: FC = () => {
    const { getFilteredTasks, deleteTask } = useTaskStore()
    const tasks = getFilteredTasks()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    function handleEditTask(task: Task) {
        setEditingTask(task)
        setIsModalOpen(true)
    }
    function handleCloseModal() {
        setIsModalOpen(false)
        setEditingTask(null)
    }
    function getTasksByColumn(columnId: ColumnId) {
        return tasks.filter((task) => task.column === columnId);
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
            {COLUMN_ORDER.map((columnId) => (
                <Column
                    key={columnId}
                    columnId={columnId}
                    tasks={getTasksByColumn(columnId)}
                    onEditTask={handleEditTask}
                    onDeleteTask={deleteTask}
                />
            ))}
            {/* Espaço para o modal */}
        </div>
    )
}

export default Board