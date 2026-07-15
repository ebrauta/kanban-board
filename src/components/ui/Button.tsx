import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button: FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    return (
        <button className={clsx(
            'px-4 py-2 rounded-lg font-medium transition-colors disabled: opacity-50 disabled:cursor-not-allowed',
            variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
            variant === 'secondary' && 'bg-slate-200 text-slate-800 hover:bg-slate-300',
            variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
            className
        )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button