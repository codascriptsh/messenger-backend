import { Router } from 'express'
import customResponse from '../helpers/customResponse'
import PostBusiness from '../business/PostBusiness'
import uploader from '../middlewares/uploader'

const PostController = Router()

PostController.get('/', async (request, response) => {
  try {
    const userId = request.userId
    const isUserPosts = request.query.isUserPosts === 'true'

    const posts = await PostBusiness.list({ userId, isUserPosts })

    return customResponse({ response, code: 200, message: 'Posts encontrados com sucesso!', data: posts })
  } catch (error) {
    console.log(error)
    return customResponse({ response, message: error?.message, data: error?.data })
  }
})

PostController.get('/:postId', async (request, response) => {
  try {
    const userId = request.userId
    const postId = request.params.postId

    const post = await PostBusiness.getById({ postId, userId })

    return customResponse({ response, code: 200, message: 'Post encontrado com sucesso!', data: post })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

PostController.post('/', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const message = request.body.message

    await PostBusiness.create({ userId, message, image: file })

    return customResponse({ response, code: 201, message: 'Post cadastrado com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

PostController.put('/:postId', uploader.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const nfc = request.body.nfc
    const postId = request.params.postId

    const post = await PostBusiness.update({ userId, nfc, image: file, postId })

    return customResponse({ response, code: 200, message: 'Post atualizado com sucesso!', data: post })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

PostController.delete('/:postId', async (request, response) => {
  try {
    const userId = request.userId
    const postId = request.params.postId

    await PostBusiness.delete({ userId, postId })

    return customResponse({ response, code: 200, message: 'Post removido com sucesso!' })
  } catch (error) {
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default PostController
