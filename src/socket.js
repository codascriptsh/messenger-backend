require('dotenv').config()
const secret = process.env.SECRET

import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'

let SocketClients = []

const onConnection = (socket) => {

  socket.on('disconnect', () => {
    SocketClients = SocketClients.filter(c => c.socketId !== socket.id)
  })

  socket.on('join-chat', (chatId) => {
    const room = chatId

    let client = SocketClients.find(client => client.socketId == socket.id)

    if (client && chatId) {
      client.activeChat = chatId
    }

    socket.join(room)
  })

  socket.on('leave-chat', (chatId) => {
    const room = chatId

    let client = SocketClients.find(client => client.socketId == socket.id)

    if (client && chatId) {
      if(client.activeChat == chatId) client.activeChat = undefined
    }

    socket.leave(room)
  })
}

const onError = (err) => {
  console.log('Socket error', err)
}

export default (server) => {
  const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['POST', 'GET'],
        allowedHeaders: ['self'],
        credentials: true
      },
      pingTimeout: 10000,
      pingInterval: 5000,
      allowEIO3: true
  })

  io.use((socket, next) => {
    const handshakeInfo = socket.handshake;

    const token = handshakeInfo.query.bearer

    let userId

    try {

      if (!token) throw new Error('Token não enviada!')

      jwt.verify(String(token), secret, async (error, result) => {
        userId = result?.id
      })

      if (!userId) throw new Error('Código do usuário não enviado')

      let client = SocketClients.find(c => c.socketId == socket.id)

      if (client && userId) client.customId = userId

      if (!client) {
        SocketClients.push({
          socketId: socket.id,
          customId: userId
        })
      }

    } catch (err) {
      socket.disconnect()
    }

    next()
  })

  io.on('connection', onConnection)
  io.engine.on('connection_error', onError)

  io.SocketClients = SocketClients

  return io
}
