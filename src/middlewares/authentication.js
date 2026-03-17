require('dotenv').config()

import jwt from 'jsonwebtoken'
import customResponse from '../helpers/customResponse'

const secret = process.env.SECRET

const authentication = async (request, response, next) => {
  const authHeader = request?.headers?.authorization
  if (!authHeader) return customResponse({ response, code: 400, message: 'Acesso negado: cabeçalho não enviado!' })

  const [header, token] = authHeader && authHeader?.split(' ')
  if (!token) return customResponse({ response, code: 400, message: 'Acesso negado: token não enviada!' })

  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        throw new Error()
      }

      request.userId = decoded.id
    })

    next()
  } catch (error) {
    return customResponse({ response, code: 400, message: 'Token inválido!' })
  }
}

export default authentication
