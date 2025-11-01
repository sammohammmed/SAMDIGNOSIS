export type ExamStatus = 'pending' | 'in_review' | 'completed' | 'requires_attention'

export interface AIResult {
  primaryDiagnosis: string
  secondaryDiagnoses: { label: string; confidence: number }[]
  confidenceScore: number
  recommendations: string[]
  notes?: string
}

export interface ExamFile {
  id: string
  name: string
  type: 'dicom' | 'image' | 'lab'
  uploadedAt: string
  size: string
}

export interface ExamSummary {
  id: string
  type: 'Radiology' | 'Lab' | 'Pathology'
  modality: string
  status: ExamStatus
  orderedBy: string
  createdAt: string
  files: ExamFile[]
  aiResult?: AIResult
  lastReviewedBy?: string
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
  exams: ExamSummary[]
}

export interface UserProfile {
  id: string
  displayName: string
  role: 'physician' | 'radiologist' | 'lab-tech' | 'admin'
  avatarUrl?: string
  organization: string
}
