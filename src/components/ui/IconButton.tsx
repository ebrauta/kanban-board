import { clsx } from "clsx";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode
    'aria-label': string
    variant?: 'default' | 'danger'
}

const IconButton: FC<IconButtonProps> = ({ icon, variant = 'default', className, ...props }) => {
    return (
        <button className={clsx('p-1 text-slate-400 transition-colors',
            variant === 'default' && 'hover:text-blue-600',
            variant === 'danger' && 'hover:text-red-600',
            className
        )}
            {...props}
        >
            {icon}
        </button>
    )
}

export default IconButton