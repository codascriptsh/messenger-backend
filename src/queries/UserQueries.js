import mongoose from 'mongoose'
import { CustomError } from '../helpers/customError'
import User from '../models/User'

const ObjectId = mongoose.Types.ObjectId

class UserQuery {
  async findOne({ ...query }) {
    try {

      return await User.findOne(query)

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao buscar o usuário no banco de dados!', 500)
    }
  }

  async create ({ name, email, password }) {
    try {
      const user = new User({ name, email, password })
      await user.save()

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao cadastrar o usuário no banco de dados!', 500)
    }
  }

  async update ({ image, id, name, bio }) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { name, bio, image },
        { new: true }
      )

      return user
    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao atualizar o usuário no banco de dados!', 500)
    }
  }
}

export default new UserQuery()
