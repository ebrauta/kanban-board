import { useState, type FC } from "react";
import type { Task, ColumnId } from "../models";
import useTaskStore from "../store/useTaskStore";
import Column from "./Column";
import TaskModal from "./TaskModal";
import FilterBar from "./FilterBar";

const COLUMN_ORDER: ColumnId[] = ['todo', 'in-progress', 'done']

const Board: FC = () => {
    const { getFilteredTasks, deleteTask, moveTask } = useTaskStore()
    const tasks = getFilteredTasks()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [targetColumn, setTargetColumn] = useState<ColumnId>('todo')

    function handleAddTask(columnId: ColumnId) {
        setEditingTask(null)
        setTargetColumn(columnId)
        setIsModalOpen(true)
    }
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
    function handleDropTask(taskId: string, columnId: ColumnId) {
        moveTask(taskId, columnId)
    }
    return (
        <div className="flex flex-col gap-4 p-4 w-full">
            <FilterBar />
            <div className="flex flex-col md:flex-row gap-4">
                {COLUMN_ORDER.map((columnId) => (
                    <Column
                        key={columnId}
                        columnId={columnId}
                        tasks={getTasksByColumn(columnId)}
                        onEditTask={handleEditTask}
                        onDeleteTask={deleteTask}
                        onAddTask={handleAddTask}
                        onDropTask={handleDropTask}
                    />
                ))}
                <TaskModal
                    isOpen={isModalOpen}
                    editingTask={editingTask}
                    defaultColumn={targetColumn}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    )
}

export default Board