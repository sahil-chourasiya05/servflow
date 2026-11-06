export const SERVICE_CATEGORIES = [
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'mechanic', label: 'Mechanic' },
] as const

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]['value']

export const getCategoryLabel = (value: string): string =>
    SERVICE_CATEGORIES.find((category) => category.value === value)?.label ?? value