export const MIN_PASSWORD_LENGTH = 8

export const isValidEmail = (value: string): boolean =>
    /^\S+@\S+\.\S+$/.test(value.trim())

export const isValidPhone = (value: string): boolean =>
    /^[6-9]\d{9}$/.test(value.trim())