import { Router } from 'express'
import authRoutes from './modules/auth.routes'
import patientRoutes from './modules/patient.routes'
import examRoutes from './modules/exam.routes'
import aiRoutes from './modules/ai.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/patients', patientRoutes)
router.use('/exams', examRoutes)
router.use('/ai', aiRoutes)

export default router
