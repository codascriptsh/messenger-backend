import mongoose, { Schema } from 'mongoose'
import appConfig from '../config/appConfig'

const Schema = mongoose.Schema
const CommentSchema = new Schema({
  message: {
    type: String
  },
  image: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

CommentSchema.virtual('image.url').get(function () {
  return `${appConfig.url}/images/${this.image.filename}`
})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
