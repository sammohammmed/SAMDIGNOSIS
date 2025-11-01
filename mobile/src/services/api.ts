import Constants from 'expo-constants'
import { type ApiResponse, type Patient, type PatientWithExams, type Exam, type AIResult } from '../types'

const API_BASE = (Constants.expoConfig?.extra?.apiUrl as string | undefined) ?? process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init
  })

  const json: ApiResponse<T> = await response.json()

  if (!response.ok || !json.success || json.data === undefined) {
    throw new Error(json.error?.message ?? `Request to ${path} failed`)
  }

  return json.data
}

export function fetchPatients(): Promise<Patient[]> {
  return request<Patient[]>('/patients')
}

export function fetchPatientDetail(patientId: string): Promise<PatientWithExams> {
  return request<PatientWithExams>(`/patients/${patientId}`)
}

export function fetchExams(): Promise<Array<Exam & { patient: Patient | null }>> {
  return request<Array<Exam & { patient: Patient | null }>>('/exams')
}

export function analyzeExam(examId: string, body?: { recommendations?: string[] }): Promise<Exam> {
  return request<Exam>(`/exams/${examId}/analyze`, {
    method: 'POST',
    body: JSON.stringify(body ?? {})
  })
}

export function analyzeAdHoc(payload: { modality: string; patientId?: string | null; files: Array<{ name: string; type: 'dicom' | 'image' | 'lab'; size?: number }> }): Promise<{
  patientId: string | null
  modality: string
  summary: string
  confidence: number
  secondaryFindings: Array<{ label: string; confidence: number }>
  filesAnalyzed: number
  turnaroundMs: number
}> {
  return request('/ai/analyze', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
