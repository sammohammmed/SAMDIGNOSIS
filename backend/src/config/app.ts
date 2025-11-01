import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { env } from './env'
import router from '../routes'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: env.ALLOW_ORIGIN.split(',').map((origin) => origin.trim()) }))
  app.use(express.json({ limit: '20mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'samdiagnosis-api', timestamp: new Date().toISOString() })
  })

  app.use('/api', router)

  app.use((_req, res) => {
    res.status(404).json({ success: false, error: { message: 'Route not found', code: 'NOT_FOUND' } })
  })

  return app
}
