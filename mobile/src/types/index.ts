export type ExamStatus = 'pending' | 'in_review' | 'completed' | 'requires_attention'

export interface FileResource {
  id: string
  name: string
  type: 'dicom' | 'image' | 'lab'
  size: string
  uploadedAt: string
}

export interface AIResult {
  primaryDiagnosis: string
  secondaryDiagnoses: Array<{ label: string; confidence: number }>
  confidenceScore: number
  recommendations: string[]
  notes?: string
}

export interface Exam {
  id: string
  patientId: string
  type: 'Radiology' | 'Lab' | 'Pathology'
  modality: string
  status: ExamStatus
  orderedBy: string
  createdAt: string
  lastReviewedBy?: string
  files: FileResource[]
  aiResult?: AIResult
}

export interface Patient {
  id: string
  mrn: string
  fullName: string
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodType: string
  allergies: string[]
  conditions: string[]
  lastVisit: string
  upcomingAppointments: string[]
}

export interface PatientWithExams {
  patient: Patient
  exams: Exam[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}
