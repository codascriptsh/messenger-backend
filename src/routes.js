import express from 'express'
import authentication from './middlewares/authentication'
import RegisterController from './controllers/RegisterController'
import LoginController from './controllers/LoginController'
import UserController from './controllers/UserController'
import PostController from './controllers/PostController'
import CommentController from './controllers/CommentController'
import MessageController from './controllers/MessageController'

const app = express.Router()

app.use('/register', RegisterController)
app.use('/login', LoginController)

app.use('/auth/users', authentication, UserController)
app.use('/auth/posts', authentication, PostController)
app.use('/auth/comments', authentication, CommentController)
app.use('/auth/messages', authentication, MessageController)

export default app
