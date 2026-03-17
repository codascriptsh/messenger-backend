import bcrypt from 'bcrypt'

import { CustomError } from '../helpers/customError'
import UserQueries from '../queries/UserQueries'

class RegisterBusiness {
  async create({ name, email, password }) {
    const userExists = await UserQueries.findOne({ email })
    if (userExists) throw new CustomError('Usuário já cadastrado no sistema!', 400)

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    await UserQueries.create({ name, email, password: passwordHash })
  }
}

export default new RegisterBusiness()
