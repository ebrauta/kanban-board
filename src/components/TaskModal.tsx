import { clsx } from "clsx";
import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import type { ColumnId, Priority, Task } from "@/models";
import useTaskStore from "@/store/useTaskStore";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface Form {
    title: string
    description: string
    tag: string
    priority: Priority
    dueDate: string
}

interface Option {
    value: Priority
    label: string
}

interface TaskModalProps {
    isOpen: boolean
    editingTask: Task | null
    defaultColumn: ColumnId
    onClose: () => void
}

const PRIORITY_OPTIONS: Option[] = [
    { value: 'low', label: "Baixa" },
    { value: 'medium', label: "Média" },
    { value: 'high', label: "Alta" }
]

const priorityToggleStyles: Record<Priority, string> = {
    low: 'data-[active=true]:bg-green-100 data-[active=true]:text-green-700 data-[active=true]:border-green-300',
    medium: 'data-[active=true]:bg-yellow-100 data-[active=true]:text-yellow-700 data-[active=true]:border-yellow-300',
    high: 'data-[active=true]:bg-red-100 data-[active=true]:text-red-700 data-[active=true]:?:border-red-300'
}

const emptyForm: Form = {
    title: '',
    description: '',
    tag: '',
    priority: 'medium' as Priority,
    dueDate: ''
}

const TaskModal: FC<TaskModalProps> = ({ isOpen, editingTask, defaultColumn, onClose }) => {
    const { addTask, updateTask } = useTaskStore()

    const [form, setForm] = useState<Form>(emptyForm)
    const [titleError, setTitleError] = useState<boolean>(false)
    const [dueDateError, setDueDateError] = useState<boolean>(false)

    const isEditing = editingTask !== null
    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title,
                description: editingTask.description,
                tag: editingTask.tag,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate
            })
        } else {
            setForm(emptyForm)
        }
        setTitleError(false)
        setDueDateError(false)
    }, [editingTask, isOpen])

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
        const trimmedTitle = form.title.trim()
        const hasTitleError = trimmedTitle.length === 0
        const hasDueDateError = form.dueDate.length === 0
        setTitleError(hasTitleError)
        setDueDateError(hasDueDateError)
        if (hasTitleError || hasDueDateError) return
        if (isEditing) {
            updateTask(editingTask.id, { ...form, title: trimmedTitle })
        } else {
            addTask({ ...form, title: trimmedTitle, column: defaultColumn })
        }
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    {isEditing ? 'Editar tarefa' : 'Nova Tarefa'}
                </h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="text-sm font-medium text-slate-600">
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={clsx(
                            'border rounded-lg px-3 py-2 text-sm',
                            titleError ? 'border-red-400' : 'border-slate-300'
                        )}
                    />
                    {titleError && (<span className="text-xs text-red-600">Título é obrigatório</span>)}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="text-sm font-medium text-slate-600">
                        Descrição
                    </label>
                    <textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        className='border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="tag" className="text-sm font-medium text-slate-600">
                        Tag
                    </label>
                    <input
                        id="tag"
                        type="text"
                        value={form.tag}
                        onChange={(e) => setForm({ ...form, tag: e.target.value })}
                        className='border border-slate-300 rounded-lg px-3 py-2 text-sm'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-600">
                        Prioridade
                    </span>
                    {PRIORITY_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            data-active={form.priority === option.value}
                            onClick={() => setForm({ ...form, priority: option.value })}
                            className={clsx(
                                'flex-1 border border-slate-300 rounded-lg py-1.5 text-sm text-slate-500 transition-colors',
                                priorityToggleStyles[option.value]
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="dueDate" className="text-sm font-medium text-slate-600">
                        Data de Vencimento
                    </label>
                    <input
                        id="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        className={clsx(
                            'border rounded-lg px-3 py-2 text-sm',
                            titleError ? 'border-red-400' : 'border-slate-300'
                        )}
                    />
                    {dueDateError && (<span className="text-xs text-red-600">Data é obrigatória</span>)}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        {isEditing ? 'Salvar' : 'Criar'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default TaskModal