import { useState, type FormEvent } from 'react'
import { Button, Select, Textarea } from '@/components/ui'
import { LocationField } from '@/components/common'
import { getCategoryLabel, type ServiceCategory } from '@/constants/categories'
import { DEFAULT_RADIUS_KM, MIN_DESCRIPTION_LENGTH, RADIUS_OPTIONS_KM } from '@/constants/request'
import { useGeolocation, useNearbyProviders } from '@/hooks'
import { createRequest } from '@/services/requestService'
import type { CreateRequestInput, RequestMode, ServiceRequest } from '@/types/request.types'
import { ModeSelector } from '../ModeSelector/ModeSelector'
import { ProviderPicker } from '../ProviderPicker/ProviderPicker'

const RADIUS_OPTIONS = RADIUS_OPTIONS_KM.map((km) => ({ value: String(km), label: `${km} km` }))

interface FormErrors {
    description?: string
    location?: string
    providers?: string
}

interface RequestFormProps {
    category: ServiceCategory
    onCreated: (request: ServiceRequest) => void
}

export function RequestForm({ category, onCreated }: RequestFormProps) {
    const geo = useGeolocation()
    const { location } = geo

    const [mode, setMode] = useState<RequestMode>('broadcast')
    const [radiusKm, setRadiusKm] = useState<number>(DEFAULT_RADIUS_KM)
    const [description, setDescription] = useState('')
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitError, setSubmitError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const nearby = useNearbyProviders(
        mode === 'direct' && location
            ? {
                category,
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                radiusKm,
            }
            : null
    )

    const selectedProviderIds = selectedIds.filter((id) =>
        nearby.providers.some((provider) => provider.id === id)
    )

    const toggleProvider = (providerId: string) => {
        setSelectedIds((prev) =>
            prev.includes(providerId) ? prev.filter((id) => id !== providerId) : [...prev, providerId]
        )
    }

    const validate = (): FormErrors => {
        const next: FormErrors = {}

        if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
            next.description = `Describe the problem in at least ${MIN_DESCRIPTION_LENGTH} characters`
        }
        if (!location) next.location = 'Detect your location to continue'
        if (mode === 'direct' && selectedProviderIds.length === 0) {
            next.providers = 'Select at least one provider'
        }

        return next
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError('')

        const nextErrors = validate()
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0 || !location) return

        const base = {
            category,
            description: description.trim(),
            longitude: location.coordinates[0],
            latitude: location.coordinates[1],
        }

        const input: CreateRequestInput =
            mode === 'broadcast'
                ? { ...base, mode: 'broadcast', radiusKm }
                : { ...base, mode: 'direct', targetProviders: selectedProviderIds }

        setIsSubmitting(true)
        try {
            onCreated(await createRequest(input))
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Could not send your request')
            setIsSubmitting(false)
            if (mode === 'direct') nearby.reload()
        }
    }

    const submitLabel =
        mode === 'direct' && selectedProviderIds.length > 0
            ? `Send to ${selectedProviderIds.length} selected ${selectedProviderIds.length === 1 ? 'provider' : 'providers'}`
            : 'Send request'

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className='flex flex-col gap-5 rounded-xl bg-white p-6 shadow'
        >
            <div>
                <h2 className='text-lg font-semibold'>Request a {getCategoryLabel(category)}</h2>
                <p className='text-sm text-gray-500'>
                    Tell us what you need and who should get your request.
                </p>
            </div>

            <ModeSelector value={mode} onChange={setMode} />

            {submitError && (
                <p role='alert' className='rounded bg-red-50 px-3 py-2 text-sm text-red-700'>
                    {submitError}
                </p>
            )}

            <LocationField
                label='Your location'
                location={location}
                isLoading={geo.isLoading}
                error={location ? undefined : geo.error || errors.location}
                onDetect={geo.detect}
            />

            <Select
                label={mode === 'direct' ? 'Show providers within' : 'Send to providers within'}
                name='radiusKm'
                options={RADIUS_OPTIONS}
                value={String(radiusKm)}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
            />

            {mode === 'direct' && (
                <div className='flex flex-col gap-1'>
                    <ProviderPicker
                        providers={nearby.providers}
                        selectedIds={selectedProviderIds}
                        isLoading={nearby.isLoading}
                        error={nearby.error}
                        hasLocation={location !== null}
                        radiusKm={radiusKm}
                        onToggle={toggleProvider}
                        onRetry={nearby.reload}
                    />
                    {errors.providers && <p className='text-xs text-red-600'>{errors.providers}</p>}
                </div>
            )}

            <Textarea
                label='Describe the problem'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
            />

            <Button type='submit' isLoading={isSubmitting}>
                {submitLabel}
            </Button>
        </form>
    )
}