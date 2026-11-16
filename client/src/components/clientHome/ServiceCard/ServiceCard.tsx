import { Link, createSearchParams } from 'react-router-dom'
import { CREATE_REQUEST_PATH } from '@/constants/routes'
import type { ServiceCategory } from '@/constants/categories'

interface ServiceCardProps {
    value: ServiceCategory
    label: string
}

export function ServiceCard({ value, label }: ServiceCardProps) {
    return (
        <Link
            to={{
                pathname: CREATE_REQUEST_PATH,
                search: createSearchParams({ category: value }).toString(),
            }}
            className='flex flex-col gap-1 rounded-lg bg-white p-4 shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
            <span className='font-medium'>{label}</span>
            <span className='text-xs text-gray-500'>Find a {label.toLowerCase()} near you</span>
        </Link>
    )
}