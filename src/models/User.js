import mongoose, { Schema } from 'mongoose'
import appConfig from '../config/appConfig'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
  bio: {
    type: String
  }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User
