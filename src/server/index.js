import http from 'http'
import express from 'express'
import router from './routers'

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

router(app, express)

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on: http://0.0.0.0:${port}`)
})
