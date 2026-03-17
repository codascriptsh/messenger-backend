import { Router } from 'express'

import customResponse from '../helpers/customResponse'
import { CustomError } from '../helpers/customError'
import validator from '../helpers/validator'
import RegisterBusiness from '../business/RegisterBusiness'

const RegisterController = Router()

RegisterController.post('/', async (request, response) => {
  try {
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    const confirmPassword = request.body.confirmPassword

    const validate = validator.register.post({ name, email, password, confirmPassword })
    if (validate.error) throw new CustomError('Campos inválidos!', 400, validate.invalidFields)

    const register = await RegisterBusiness.create({ name, email, password, confirmPassword })

    return customResponse({ response, code: 201, message: 'Cadastro realizado com sucesso!' })
  } catch (error) {
    console.log({ error })
    return customResponse({ response, code: error?.code, message: error?.message, data: error?.data })
  }
})

export default RegisterController
