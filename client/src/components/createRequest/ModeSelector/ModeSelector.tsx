import type { RequestMode } from '@/types/request.types'

const OPTIONS: { value: RequestMode; title: string; hint: string }[] = [
    { value: 'broadcast', title: 'Nearby providers', hint: 'Send to all online providers around you' },
    { value: 'direct', title: 'Choose providers', hint: 'Pick the providers you want' },
]

interface ModeSelectorProps {
    value: RequestMode
    onChange: (mode: RequestMode) => void
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
    return (
        <div role='radiogroup' aria-label='Request type' className='grid grid-cols-2 gap-2'>
            {OPTIONS.map((option) => {
                const active = value === option.value

                return (
                    <button
                        key={option.value}
                        type='button'
                        role='radio'
                        aria-checked={active}
                        onClick={() => onChange(option.value)}
                        className={`rounded border px-3 py-2 text-left text-sm ${active
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <span className='block font-medium'>{option.title}</span>
                        <span className='block text-xs text-gray-500'>{option.hint}</span>
                    </button>
                )
            })}
        </div>
    )
}