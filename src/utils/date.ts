const MILISSECONDS_PER_DAY = 1000 * 60 * 60 * 24
/** 
 * Converte uma string "YYYY-MM-DD" em um objeto Date no fuso LOCAL,
 * evitando o bug dw New Date("YYYY-MM-DD") assumir UTC.
*/
function parseLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
}

/**
 * Retorna a data de hojde "zerada" (sem horas), para comparar
 * apenas dia/mês/ano, sem interferência do horário atual.
 */
function getTodayStartOfDay(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/**
 * Formata "YYYY-MM-DD" para "DD/MM/YYYY".
 */
export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

/**
 * Retorna true se a data já passou em relaçoa a hoje.
 */
export function isOverdue(dateString: string): boolean {
    const dueDate = parseLocalDate(dateString)
    const today = getTodayStartOfDay()
    return dueDate < today
}

/**
 * Retorna a quantidade de dias até o prazo.
 * Valores negativos indicam dias de atraso.
 */
export function daysUntilDue(dateString: string): number {
    const dueDate = parseLocalDate(dateString)
    const today = getTodayStartOfDay()
    return Math.round((dueDate.getTime() - today.getTime()) / MILISSECONDS_PER_DAY);
}