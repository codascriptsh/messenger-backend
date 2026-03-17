import { CustomError } from '../helpers/customError'
import UserQueries from '../queries/UserQueries'
import User from '../models/User'
import mongoose from 'mongoose'
import appConfig from '../config/appConfig'

class UserBusiness {
  async info({ id }) {
    const user = await User.findById(new mongoose.Types.ObjectId(id), '-password')
    if (!user) throw new CustomError('Usuário não encontrado!', 404)

    return user
  }

  async update({ image, id, name, bio }) {
    if (image) image.url = `${appConfig.url}/images/${image.filename}`

    const user = await UserQueries.update({ image, id, name, bio })

    return user
  }
}

export default new UserBusiness()
