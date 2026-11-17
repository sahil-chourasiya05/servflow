import { Navigate } from 'react-router-dom'
import { getCategoryLabel } from '@/constants/categories'
import { CLIENT_HOME_PATH } from '@/constants/routes'
import { useSelectedCategory } from '@/hooks'

export function CreateRequest() {
    const category = useSelectedCategory()

    if (!category) return <Navigate to={CLIENT_HOME_PATH} replace />

    return (
        <h2 className='text-xl font-bold'>
            Request a {getCategoryLabel(category)} (form coming next)
        </h2>
    )
}