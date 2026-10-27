import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Select } from '@/components/ui'
import { LocationField } from '@/components/common/locationfield/LocationField'
import { RoleSelector } from '@/components/auth/roleselector/RoleSelector'
import { SERVICE_CATEGORIES } from '@/constants/categories'
import { useAuth, useGeolocation } from '@/hooks'
import type { RegisterInput, UserRole } from '@/types/auth.types'
import { MIN_PASSWORD_LENGTH, isValidEmail, isValidPhone } from '@/utils/validators'

interface FormState {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    addressLabel: string
    category: string
    travelFee: string
}

type FormErrors = Partial<Record<keyof FormState | 'location', string>>

const INITIAL_FORM: FormState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    addressLabel: 'Home',
    category: '',
    travelFee: '',
}

export function SignupForm() {
    const { register } = useAuth()
    const geo = useGeolocation()

    const [role, setRole] = useState<UserRole>('client')
    const [form, setForm] = useState<FormState>(INITIAL_FORM)
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitError, setSubmitError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const update =
        (field: keyof FormState) =>
            (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }))

    const validate = (): FormErrors => {
        const next: FormErrors = {}
        const name = form.name.trim()

        if (name.length < 2 || name.length > 50) next.name = 'Name must be 2 to 50 characters'
        if (!isValidEmail(form.email)) next.email = 'Enter a valid email address'
        if (!isValidPhone(form.phone)) next.phone = 'Enter a valid 10-digit Indian mobile number'
        if (form.password.length < MIN_PASSWORD_LENGTH) {
            next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
        }
        if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match'
        if (!geo.location) next.location = 'Detect your location to continue'

        if (role === 'client' && !form.addressLabel.trim()) {
            next.addressLabel = 'Give this address a label, like Home'
        }

        if (role === 'provider') {
            if (!form.category) next.category = 'Select your service category'
            const fee = Number(form.travelFee)
            if (form.travelFee === '' || Number.isNaN(fee) || fee < 0) {
                next.travelFee = 'Enter a travel fee of 0 or more'
            }
        }

        return next
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError('')

        const nextErrors = validate()
        setErrors(nextErrors)

        const { location } = geo
        if (Object.keys(nextErrors).length > 0 || !location) return

        const base = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            password: form.password,
        }

        const input: RegisterInput =
            role === 'client'
                ? {
                    ...base,
                    role: 'client',
                    savedAddresses: [{ label: form.addressLabel.trim(), location }],
                }
                : {
                    ...base,
                    role: 'provider',
                    category: form.category,
                    travelFee: Number(form.travelFee),
                    location,
                }

        setIsSubmitting(true)
        try {
            await register(input)
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Signup failed')
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
            <h2 className='text-center text-lg font-semibold'>Create your account</h2>

            <RoleSelector value={role} onChange={setRole} />

            {submitError && (
                <p role='alert' className='rounded bg-red-50 px-3 py-2 text-sm text-red-700'>
                    {submitError}
                </p>
            )}

            <Input label='Full name' name='name' autoComplete='name' value={form.name} onChange={update('name')} error={errors.name} />
            <Input label='Email' name='email' type='email' autoComplete='email' value={form.email} onChange={update('email')} error={errors.email} />
            <Input label='Phone' name='phone' type='tel' autoComplete='tel' value={form.phone} onChange={update('phone')} error={errors.phone} />
            <Input label='Password' name='password' type='password' autoComplete='new-password' value={form.password} onChange={update('password')} error={errors.password} />
            <Input label='Confirm password' name='confirmPassword' type='password' autoComplete='new-password' value={form.confirmPassword} onChange={update('confirmPassword')} error={errors.confirmPassword} />

            {role === 'client' ? (
                <Input label='Address label' name='addressLabel' value={form.addressLabel} onChange={update('addressLabel')} error={errors.addressLabel} />
            ) : (
                <>
                    <Select label='Service category' name='category' options={SERVICE_CATEGORIES} value={form.category} onChange={update('category')} error={errors.category} />
                    <Input label='Travel fee (INR)' name='travelFee' type='number' min={0} value={form.travelFee} onChange={update('travelFee')} error={errors.travelFee} />
                </>
            )}

            <LocationField
                label={role === 'client' ? 'Address location' : 'Service location'}
                location={geo.location}
                isLoading={geo.isLoading}
                error={geo.location ? undefined : geo.error || errors.location}
                onDetect={geo.detect}
            />

            <Button type='submit' isLoading={isSubmitting}>
                Sign up
            </Button>

            <p className='text-center text-sm text-gray-600'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-600 underline'>
                    Log in
                </Link>
            </p>
        </form>
    )
}