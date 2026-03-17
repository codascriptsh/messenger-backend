import { CustomError } from '../helpers/customError'
import mongoose from 'mongoose'
import PostQueries from '../queries/PostQueries'
import appConfig from '../config/appConfig'

const ObjectId = mongoose.Types.ObjectId

class PostBusiness {
  async list({ userId, isUserPosts }) {
    const posts = await PostQueries.findAll({ creatorId: new ObjectId(userId), isUserPosts })

    return posts
  }

  async getById({ productId, userId }) {
    const post = await PostQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    if (!post) throw new CustomError('Post não encontrado!', 404)

    return post
  }

  async create({ userId, message, image }) {
    image.url = `${appConfig.url}/images/${image.filename}`

    await PostQueries.create({ userId, message, image })
  }

  async update({ userId, nfc, image, productId }) {
    // const checkIfProductExists = await PostQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    // if (!checkIfProductExists) throw new CustomError('Post não encontrado!', 404)

    // const post = await PostQueries.update({ userId, productId, nfc, image })

    return post
  }

  async delete({ userId, productId }) {
    // const checkIfProductExists = await PostQueries.findOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    // if (!checkIfProductExists) throw new CustomError('Post não encontrado!', 404)

    // await PostQueries.delete({ userId, productId })
  }
}

export default new PostBusiness()
