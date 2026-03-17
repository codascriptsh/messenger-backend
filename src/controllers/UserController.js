import { Router } from 'express'
import customResponse from '../helpers/customResponse'
import UserBusiness from '../business/UserBusiness'
import upload from '../middlewares/uploader'

const UserController = Router()

UserController.get('/:id', async (request, response) => {
  try {
    const userId = request.userId
    const id = request.params.id

    if (userId.toString() !== id.toString()) throw new CustomError('Acesso negado!', 401)

    const user = await UserBusiness.info({ userId, id })

    return customResponse({ response, code: 200, message: 'Usuário encontrado com sucesso!', data: user })
  } catch (error) {
    console.log(error)
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

UserController.put('/:id', upload.single('image'), async (request, response) => {
  try {
    const file = request.file
    const userId = request.userId
    const id = request.params.id

    const name = request.body.name
    const bio = request.body.bio

    if (userId.toString() !== id.toString()) throw new CustomError('Acesso negado!', 401)

    const user = await UserBusiness.update({ image: file, id, name, bio })

    return customResponse({ response, code: 200, messsage: 'Usuário atualizado com sucesso!' })
  } catch (error) {
    console.log({ error })
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default UserController
