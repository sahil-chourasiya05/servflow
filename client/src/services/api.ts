import axios, { type AxiosError } from 'axios'

export class ApiRequestError extends Error {
    status?: number

    constructor(message: string, status?: number) {
        super(message)
        this.name = 'ApiRequestError'
        this.status = status
    }
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError<{ message?: string }>) =>
        Promise.reject(
            new ApiRequestError(
                error.response?.data?.message ?? 'Something went wrong',
                error.response?.status
            )
        )
)

export default api