import mongoose from 'mongoose'
import { CustomError } from '../helpers/customError'
import Comment from '../models/Comment'

const ObjectId = mongoose.Types.ObjectId

class CommentQuery {
  async findOne({ ...query }) {
    try {
      return await Comment.findOne(query)

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao buscar o comentário no banco de dados!', 500)
    }
  }

  async findAll({ ...query }) {
    try {
      return await Comment.find(query).sort('-createdAt')
    } catch (error) {
      throw new CustomError('Erro ao buscar os comentários no banco de dados!', 500)
    }
  }

  async create ({}) {
    try {
      // const comment = new Comment({ creatorId: new ObjectId(userId), nfc, image })
      // await comment.save()

    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao cadastrar o comentário no banco de dados!', 500)
    }
  }

  async update ({}) {
    try {
      // const comment = await Comment.findOneAndUpdate(
      //   { _id: new ObjectId(productId), creatorId: new ObjectId(userId) },
      //   { nfc, image },
      //   { new: true }
      // )

      // return comment
    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao atualizar o comentário no banco de dados!', 500)
    }
  }

  async delete ({}) {
    try {
      // await Comment.deleteOne({ _id: new ObjectId(productId), creatorId: new ObjectId(userId) })
    } catch (error) {
      console.log(error)
      throw new CustomError('Erro ao deletar o comentário no banco de dados!')
    }
  }
}

export default new CommentQuery()
