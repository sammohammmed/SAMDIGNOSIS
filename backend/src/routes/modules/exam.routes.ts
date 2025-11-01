import { Router } from 'express'
import { listExams, getExam, createExam, analyzeExam } from '@controllers/exam.controller'

const router = Router()

router.get('/', listExams)
router.post('/', createExam)
router.get('/:id', getExam)
router.post('/:id/analyze', analyzeExam)

export default router
