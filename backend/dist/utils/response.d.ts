import { type ApiError, type ApiResponse } from '../types';
export declare function ok<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T>;
export declare function fail(message: string, code?: string): ApiError;
//# sourceMappingURL=response.d.ts.map