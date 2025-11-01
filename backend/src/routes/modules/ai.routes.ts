import { Router } from 'express'
import { analyzePayload } from '@controllers/ai.controller'

const router = Router()

router.post('/analyze', analyzePayload)

export default router
