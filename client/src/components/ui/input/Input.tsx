import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
    const inputId = id ?? props.name

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={inputId} className='text-sm font-medium text-gray-700'>
                {label}
            </label>
            <input
                id={inputId}
                aria-invalid={Boolean(error)}
                className={`rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500
                     ${error ? 'border-red-500' : 'border-gray-300'} ${className}`
                }
                {...props}
            />
            {error && <p className='text-xs text-red-600'>{error}</p>}
        </div>
    )
}