import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
    value: string
    label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: readonly SelectOption[]
    placeholder?: string
    error?: string
}

export function Select({
    label,
    options,
    placeholder = 'Select...',
    error,
    id,
    className = '',
    ...props
}: SelectProps) {
    const selectId = id ?? props.name

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={selectId} className='text-sm font-medium text-gray-700'>
                {label}
            </label>
            <select
                id={selectId}
                aria-invalid={Boolean(error)}
                className={`rounded border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                    } ${className}`}
                {...props}
            >
                <option value='' disabled>{placeholder}</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            {error && <p className='text-xs text-red-600'>{error}</p>}
        </div>
    )
}