import { Router } from 'express'
import customResponse from '../helpers/customResponse'
import validator from '../helpers/validator'
import { CustomError } from '../helpers/customError'
import LoginBusiness from '../business/LoginBusiness'

const LoginController = Router()

LoginController.post('/', async (request, response) => {
  try {
    const email = request.body.email
    const password = request.body.password

    const validate = validator.login.post({ email, password })
    if (validate.error) throw new CustomError('Campos inválidos!', 400, validate.invalidFields)

    const data = await LoginBusiness.token({ email, password })

    return customResponse({ response, code: 200, message: 'Login realizado com sucesso!', data: { ...data } })
  } catch (error) {
    console.log(error)
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default LoginController
