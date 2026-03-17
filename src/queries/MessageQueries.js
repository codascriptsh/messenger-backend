import mongoose from 'mongoose'
import { CustomError } from '../helpers/customError'
import Message from '../models/Message'

const ObjectId = mongoose.Types.ObjectId

class MessageQuery {
  async findOne({ ...query }) {
    try {
      return await Message.findOne(query)

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao buscar a mensagem no banco de dados!', 500)
    }
  }

  async findAll({ ...query }) {
    try {
      return await Message.find(query).sort('-createdAt')
    } catch (error) {
      throw new CustomError('Erro ao buscar as mensagens no banco de dados!', 500)
    }
  }

  async create ({}) {
    try {
      // const message = new Message({ creatorId: new ObjectId(userId), nfc, image })
      // await message.save()

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao enviar a mensagem no banco de dados!', 500)
    }
  }
}

export default new MessageQuery()
