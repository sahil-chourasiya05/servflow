import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}

export function Button({
    isLoading = false,
    disabled,
    children,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled || isLoading}
            className={`rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 
                disabled:cursor-not-allowed disabled:opacity-60 ${className}`
            }
            {...props}
        >
            {isLoading ? 'Please wait...' : children}
        </button>
    )
}