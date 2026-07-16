export type ColumnId = 'todo' | 'in-progress' | 'done'

export const COLUMN_LABELS: Record<ColumnId, string> = {
    todo: 'A Fazer',
    'in-progress': "Em progresso",
    done: 'Concluído'
}