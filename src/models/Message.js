import mongoose, { Schema } from 'mongoose'
import appConfig from '../config/appConfig'

const Schema = mongoose.Schema
const MessageSchema = new Schema({
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
  members: {
    type: [mongoose.Types.ObjectId],
    required: true
  },
  readBy: {
    type: [mongoose.Types.ObjectId],
    required: true
  },
  chatId: {
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

MessageSchema.virtual('image.url').get(function () {
  return `${appConfig.url}/images/${this.image.filename}`
})

const Message = mongoose.model('Message', MessageSchema)

export default Message
