import { Provider } from '@/models/Provider.js'
import { ApiError } from '@/utils/ApiError.js'

export const setOnlineStatus = async (providerId: string, isOnline: boolean) => {
    const provider = await Provider.findByIdAndUpdate(providerId, { isOnline }, { new: true })

    if (!provider) {
        throw ApiError.notFound('Provider not found')
    }

    return provider
}