import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { RequestForm, RequestSent } from '@/components/createRequest'
import { CLIENT_HOME_PATH } from '@/constants/routes'
import { useSelectedCategory } from '@/hooks'
import type { ServiceRequest } from '@/types/request.types'

export function CreateRequest() {
    const category = useSelectedCategory()
    const [created, setCreated] = useState<ServiceRequest | null>(null)

    if (!category) return <Navigate to={CLIENT_HOME_PATH} replace />

    return (
        <div className='mx-auto max-w-xl'>
            {created ? (
                <RequestSent request={created} />
            ) : (
                <RequestForm key={category} category={category} onCreated={setCreated} />
            )}
        </div>
    )
}