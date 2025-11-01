import type { Request, Response } from 'express'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { patients, exams } from '@data/mockDb'
import { ok, fail } from '@utils/response'

const createPatientSchema = z.object({
  mrn: z.string().min(3),
  fullName: z.string().min(3),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female']),
  bloodType: z.string().min(1),
  allergies: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  upcomingAppointments: z.array(z.string()).default([])
})

export function listPatients(_req: Request, res: Response) {
  const patientSummaries = patients.map((patient) => {
    const patientExams = exams.filter((exam) => exam.patientId === patient.id)
    return {
      ...patient,
      examsCount: patientExams.length,
      lastExamAt: patientExams[0]?.createdAt ?? null
    }
  })

  return res.json(ok(patientSummaries))
}

export function createPatient(req: Request, res: Response) {
  const parsed = createPatientSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(fail('Invalid patient payload', 'VALIDATION_ERROR'))
  }

  const payload = parsed.data
  const newPatient = {
    id: uuid(),
    lastVisit: new Date().toISOString(),
    ...payload
  }

  patients.push(newPatient)

  return res.status(201).json(ok(newPatient))
}

export function getPatient(req: Request, res: Response) {
  const patient = patients.find((item) => item.id === req.params.id)
  if (!patient) {
    return res.status(404).json(fail('Patient not found', 'PATIENT_NOT_FOUND'))
  }

  const patientExams = exams
    .filter((exam) => exam.patientId === patient.id)
    .map((exam) => ({
      id: exam.id,
      type: exam.type,
      modality: exam.modality,
      status: exam.status,
      createdAt: exam.createdAt,
      aiResult: exam.aiResult,
      files: exam.files
    }))

  return res.json(ok({ patient, exams: patientExams }))
}

export function listPatientExams(req: Request, res: Response) {
  const patient = patients.find((item) => item.id === req.params.id)
  if (!patient) {
    return res.status(404).json(fail('Patient not found', 'PATIENT_NOT_FOUND'))
  }

  const patientExams = exams.filter((exam) => exam.patientId === patient.id)
  return res.json(ok(patientExams))
}
