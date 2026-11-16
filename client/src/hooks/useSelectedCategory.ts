import { useSearchParams } from 'react-router-dom'
import { SERVICE_CATEGORIES, type ServiceCategory } from '@/constants/categories'

export function useSelectedCategory(): ServiceCategory | null {
    const [searchParams] = useSearchParams()
    const value = searchParams.get('category')

    return SERVICE_CATEGORIES.find((category) => category.value === value)?.value ?? null
}