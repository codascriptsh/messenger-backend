require('dotenv').config()

import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'

import router from './routes'
import connectToDatabase from './database/connect'
import { resolve } from 'path'
import socket from './socket'

connectToDatabase()

const app = express()

const server = http.createServer(app)

app.io = socket(server)

app.use(cors())
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(resolve(__dirname, '..', 'uploads')))
app.use(router)

app.get('/', (request, response) => {
  response.json({ message: 'Server running!' })
})

server.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`Something went wrong: ${error}`);
  }
  else {
      console.log(`Server running on port ${process.env.PORT}`);
  }
})
