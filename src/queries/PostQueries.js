import mongoose from 'mongoose'
import { CustomError } from '../helpers/customError'
import Post from '../models/Post'

const ObjectId = mongoose.Types.ObjectId

class PostQuery {
  async findOne({ ...query }) {
    try {
      return await Post.findOne(query)

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao buscar o post no banco de dados!', 500)
    }
  }

  async findAll({ ...query }) {
    try {
      const stages = [{ $lookup: { from: 'users', localField: 'creatorId', foreignField: '_id', as: 'user' } }, { $sort: { createdAt: -1 } }]
      if (query.isUserPosts) stages.unshift({ $match: { creatorId: query.creatorId } })

      return await Post.aggregate(stages)
    } catch (error) {
      throw new CustomError('Erro ao buscar os produtos no banco de dados!', 500)
    }
  }

  async create ({ userId, message, image }) {
    try {
      const post = new Post({ creatorId: new ObjectId(userId), message, image })
      await post.save()

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao cadastrar o post no banco de dados!', 500)
    }
  }

  async update ({}) {
    try {
      // const post = await Post.findOneAndUpdate(
      //   { _id: new ObjectId(productId), creatorId: new ObjectId(userId) },
      //   { nfc, image },
      //   { new: true }
      // )

      // return post
    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao atualizar o post no banco de dados!', 500)
    }
  }

  async delete ({}) {
    try {
      // await Post.deleteOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao deletar o post no banco de dados!')
    }
  }
}

export default new PostQuery()
