import type { UserRole } from '@/types/auth.types'

const OPTIONS: { value: UserRole; title: string; hint: string }[] = [
    { value: 'client', title: 'Client', hint: 'I need a service' },
    { value: 'provider', title: 'Provider', hint: 'I provide services' },
]

interface RoleSelectorProps {
    value: UserRole
    onChange: (role: UserRole) => void
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
    return (
        <div role='radiogroup' aria-label='Account type' className='grid grid-cols-2 gap-2'>
            {OPTIONS.map((opt) => {
                const active = value === opt.value
                return (
                    <button
                        key={opt.value}
                        type='button'
                        role='radio'
                        aria-checked={active}
                        onClick={() => onChange(opt.value)}
                        className={`rounded border px-3 py-2 text-left text-sm ${active
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`
                        }
                    >
                        <span className='block font-medium'>{opt.title}</span>
                        <span className='block text-xs text-gray-500'>{opt.hint}</span>
                    </button>
                )
            })}
        </div>
    )
}