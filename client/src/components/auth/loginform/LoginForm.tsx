import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail } from '@/utils/validators'

interface FieldErrors {
    email?: string
    password?: string
}

export function LoginForm() {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const [submitError, setSubmitError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validate = (): FieldErrors => {
        const errors: FieldErrors = {}
        if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
        if (!password) errors.password = 'Password is required'
        return errors
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError('')

        const errors = validate()
        setFieldErrors(errors)
        if (Object.keys(errors).length > 0) return

        setIsSubmitting(true)
        try {
            await login({ email: email.trim(), password })
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Login failed')
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
            <h2 className='text-center text-lg font-semibold'>Log in to your account</h2>

            {submitError && (
                <p role='alert' className='rounded bg-red-50 px-3 py-2 text-sm text-red-700'>
                    {submitError}
                </p>
            )}

            <Input
                label='Email'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
            />

            <Input
                label='Password'
                name='password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
            />

            <Button type='submit' isLoading={isSubmitting}>
                Log in
            </Button>

            <p className='text-center text-sm text-gray-600'>
                New to ServFlow?{' '}
                <Link to='/signup' className='text-blue-600 underline'>
                    Sign up
                </Link>
            </p>
        </form>
    )
}