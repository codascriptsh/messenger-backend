import mongoose, { Schema } from 'mongoose'
import appConfig from '../config/appConfig'

const Schema = mongoose.Schema
const PostSchema = new Schema({
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
    size: Number,
    url: String
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post
