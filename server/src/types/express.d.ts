import { UserRole } from './models.types.js'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                role: UserRole
            }
        }
    }
}

export {}