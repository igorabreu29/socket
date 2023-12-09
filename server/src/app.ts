import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import path from 'node:path'

const app = express()
app.use(express.static(path.join(__dirname, '../../app')))

const httpServer = createServer(app)
const io = new Server(httpServer)

export {
    io,
    httpServer
}