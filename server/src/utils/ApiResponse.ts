export class ApiResponse<T = unknown> {
    public readonly success: boolean

    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly data?: T
    ) {
        this.success = statusCode < 400
    }
}