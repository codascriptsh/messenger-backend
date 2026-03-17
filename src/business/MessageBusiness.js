import { CustomError } from '../helpers/customError'
import mongoose from 'mongoose'
import MessageQueries from '../queries/MessageQueries'

const ObjectId = mongoose.Types.ObjectId

class MessageBusiness {
  async list({ userId }) {
    const messages = await MessageQueries.findAll({ creatorId: new ObjectId(userId) })

    return messages
  }

  async getById({ productId, userId }) {
    const message = await MessageQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    if (!message) throw new CustomError('Produto não encontrado!', 404)

    return message
  }

  async create({ userId, nfc, image }) {
    await MessageQueries.create({ userId, nfc, image })
  }

  async update({ userId, nfc, image, productId }) {
    const checkIfProductExists = await MessageQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    if (!checkIfProductExists) throw new CustomError('Produto não encontrado!', 404)

    const message = await MessageQueries.update({ userId, productId, nfc, image })

    return message
  }

  async delete({ userId, productId }) {
    const checkIfProductExists = await MessageQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    if (!checkIfProductExists) throw new CustomError('Produto não encontrado!', 404)

    await MessageQueries.delete({ userId, productId })
  }
}

export default new MessageBusiness()
