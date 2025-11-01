import { createServer } from 'http'
import { createApp } from '@config/app'
import { env } from '@config/env'

const app = createApp()
const server = createServer(app)

const port = env.PORT

server.listen(port, () => {
  console.log(`SAMDIAGNOSIS API running on http://localhost:${port}`)
})
