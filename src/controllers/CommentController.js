import { Router } from 'express'
import customResponse from '../helpers/customResponse'
import CommentBusiness from '../business/CommentBusiness'
import uploader from '../middlewares/uploader'

const CommentController = Router()

CommentController.get('/', async (request, response) => {
  try {
    const userId = request.userId

    const comments = await CommentBusiness.list({ userId })

    return customResponse({ response, code: 200, message: 'Comentários encontrados com sucesso!', data: comments })
  } catch (error) {
    return customResponse({ response, message: error?.message, data: error?.data })
  }
})

CommentController.get('/:commentId', async (request, response) => {
  try {
    const userId = request.userId
    const commentId = request.params.commentId

    const comment = await CommentBusiness.getById({ commentId, userId })

    return customResponse({ response, code: 200, message: 'Comentário encontrado com sucesso!', data: comment })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

CommentController.post('/', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const nfc = request.body.nfc

    await CommentBusiness.create({ userId, nfc, image: file })

    return customResponse({ response, code: 201, message: 'Comentário cadastrado com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

CommentController.put('/:commentId', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const nfc = request.body.nfc
    const commentId = request.params.commentId

    const comment = await CommentBusiness.update({ userId, nfc, image: file, commentId })

    return customResponse({ response, code: 200, message: 'Comentário atualizado com sucesso!', data: comment })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

CommentController.delete('/:commentId', async (request, response) => {
  try {
    const userId = request.userId
    const commentId = request.params.commentId

    await CommentBusiness.delete({ userId, commentId })

    return customResponse({ response, code: 200, message: 'Comentário removido com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default CommentController
