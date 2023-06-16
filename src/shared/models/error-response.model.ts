export type ErrorResponse = {
    dateTime: string;
    path: string;
    error: unknown;
    message: string;
    statusCode: number;
}