import { CustomError } from '../helpers/customError'
import mongoose from 'mongoose'
import CommentQueries from '../queries/CommentQueries'

const ObjectId = mongoose.Types.ObjectId

class CommentBusiness {
  async list({ userId }) {
    const comments = await CommentQueries.findAll({ creatorId: new ObjectId(userId) })

    return comments
  }

  async getById({ productId, userId }) {
    const comment = await CommentQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    if (!comment) throw new CustomError('Comentário não encontrado!', 404)

    return comment
  }

  async create({ userId, nfc, image }) {
    await CommentQueries.create({ userId, nfc, image })
  }

  async update({ userId, nfc, image, productId }) {
    // const checkIfProductExists = await CommentQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    // if (!checkIfProductExists) throw new CustomError('Comentário não encontrado!', 404)

    // const comment = await CommentQueries.update({ userId, productId, nfc, image })

    // return comment
  }

  async delete({ userId, productId }) {
    // const checkIfProductExists = await CommentQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    // if (!checkIfProductExists) throw new CustomError('Comentário não encontrado!', 404)

    // await CommentQueries.delete({ userId, productId })
  }
}

export default new CommentBusiness()
