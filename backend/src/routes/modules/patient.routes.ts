import { Router } from 'express'
import { listPatients, createPatient, getPatient, listPatientExams } from '@controllers/patient.controller'
import { createExamForPatient } from '@controllers/exam.controller'

const router = Router()

router.get('/', listPatients)
router.post('/', createPatient)
router.get('/:id', getPatient)
router.get('/:id/exams', listPatientExams)
router.post('/:id/exams', createExamForPatient)

export default router
