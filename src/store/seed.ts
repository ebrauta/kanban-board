import type { Task } from "../models";
import { v4 as uuidv4 } from 'uuid'

export const seedTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Configurar projeto',
    description: 'Setup inicial com Vite, React, TypeScript e Tailwind',
    tag: 'setup',
    priority: 'high',
    dueDate: '2026-07-18',
    column: 'done',
  },
  {
    id: uuidv4(),
    title: 'Criar componentes de UI',
    description: 'Botões, modal e badge reutilizáveis',
    tag: 'frontend',
    priority: 'medium',
    dueDate: '2026-07-22',
    column: 'in-progress',
  },
  {
    id: uuidv4(),
    title: 'Implementar drag-and-drop',
    description: 'Permitir mover cartões entre colunas',
    tag: 'frontend',
    priority: 'high',
    dueDate: '2026-07-25',
    column: 'todo',
  },
]