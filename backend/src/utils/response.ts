import { type ApiError, type ApiResponse } from '../types'

export function ok<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  if (meta) {
    return { success: true, data, meta }
  }
  return { success: true, data }
}

export function fail(message: string, code?: string): ApiError {
  if (code) {
    return { success: false, error: { message, code } }
  }
  return { success: false, error: { message } }
}
