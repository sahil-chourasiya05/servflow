import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
    const textareaId = id ?? props.name

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={textareaId} className='text-sm font-medium text-gray-700'>
                {label}
            </label>
            <textarea
                id={textareaId}
                rows={4}
                aria-invalid={Boolean(error)}
                className={`rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                    } ${className}`}
                {...props}
            />
            {error && <p className='text-xs text-red-600'>{error}</p>}
        </div>
    )
}