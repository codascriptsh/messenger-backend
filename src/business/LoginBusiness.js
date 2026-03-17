require('dotenv').config()
import bcrypt from 'bcrypt'

import { CustomError } from '../helpers/customError'
import UserQueries from '../queries/UserQueries'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION

class LoginBusiness {
  async token({ email, password }) {
    const user = await UserQueries.findOne({ email })
    if (!user) throw new CustomError('Usuário não encontrado!', 404)

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) throw new CustomError('Senha inválida!', 400)

    try {
      const token = jwt.sign({
        id: user._id
      }, secret, { expiresIn: accessTokenExpiration })

      return { token, user: { name: user.name, id: user._id } }
    } catch (error) {
      console(error)
      throw new CustomError('Erro ao realizar a autenticação do usuário!', 500)
    }
  }
}

export default new LoginBusiness()
