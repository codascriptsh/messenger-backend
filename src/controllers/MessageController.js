import { Router } from 'express'
import customResponse from '../helpers/customResponse'
import MessageBusiness from '../business/MessageBusiness'
import uploader from '../middlewares/uploader'

const MessageController = Router()

MessageController.get('/', async (request, response) => {
  try {
    const userId = request.userId

    const messages = await MessageBusiness.list({ userId })

    return customResponse({ response, code: 200, message: 'Mensagens encontrados com sucesso!', data: messages })
  } catch (error) {
    return customResponse({ response, message: error?.message, data: error?.data })
  }
})

MessageController.get('/:messageId', async (request, response) => {
  try {
    const userId = request.userId
    const messageId = request.params.messageId

    const product = await MessageBusiness.getById({ messageId, userId })

    return customResponse({ response, code: 200, message: 'Mensagem encontrado com sucesso!', data: product })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

MessageController.post('/', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const nfc = request.body.nfc

    await MessageBusiness.create({ userId, nfc, image: file })

    return customResponse({ response, code: 201, message: 'Mensagem cadastrado com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

MessageController.put('/:messageId', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const nfc = request.body.nfc
    const messageId = request.params.messageId

    const product = await MessageBusiness.update({ userId, nfc, image: file, messageId })

    return customResponse({ response, code: 200, message: 'Mensagem atualizado com sucesso!', data: product })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

MessageController.delete('/:messageId', async (request, response) => {
  try {
    const userId = request.userId
    const messageId = request.params.messageId

    await MessageBusiness.delete({ userId, messageId })

    return customResponse({ response, code: 200, message: 'Mensagem removido com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default MessageController
