import { ServiceCard } from '@/components/clientHome'
import { SERVICE_CATEGORIES } from '@/constants/categories'

export function Home() {
    return (
        <div className='mx-auto flex max-w-3xl flex-col gap-6'>
            <div>
                <h2 className='text-xl font-bold'>What do you need help with?</h2>
                <p className='mt-1 text-sm text-gray-600'>
                    Choose a service to find providers near you.
                </p>
            </div>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                {SERVICE_CATEGORIES.map(({ value, label }) => (
                    <ServiceCard key={value} value={value} label={label} />
                ))}
            </div>
        </div>
    )
}