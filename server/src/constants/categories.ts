export const SERVICE_CATEGORIES = [
    'electrician',
    'plumber',
    'carpenter',
    'painter',
    'mechanic',
] as const

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]

export const isServiceCategory = (value: unknown): value is ServiceCategory =>
    typeof value === 'string' &&
    (SERVICE_CATEGORIES as readonly string[]).includes(value)