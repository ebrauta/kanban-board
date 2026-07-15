import type { FC, ReactNode } from "react"
import type { Priority } from "../../models"
import clsx from "clsx"

interface BadgeProps {
    variant: 'priority' | 'tag'
    priority?: Priority
    children: ReactNode
}

const priorityStyles: Record<Priority, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
}

const Badge: FC<BadgeProps> = ({ variant, priority, children }) => {
    return (
        <span className={clsx(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            variant === 'priority' && priority && priorityStyles[priority],
            variant === 'tag' && 'border border-slate-300 text-slate-600'
        )}>
            {children}
        </span>
    )
}

export default Badge