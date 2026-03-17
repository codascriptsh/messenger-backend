import multer from 'multer'
import { extname, resolve } from 'path'
import customResponse from '../helpers/customResponse'

const whitelist = ['image/png', 'image/jpg', 'image/jpeg']

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
  },
  filename: (request, file, cb) => {
    cb(null, `${Date.now()}${extname(file.originalname)}`)
  }
})

const upload = multer(
    {
      storage,
      fileFilter: (request, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
          return cb(new multer.MulterError('O arquivo precisa ser PNG, JPG ou JPEG!'))
        }

        cb(null, true)
      }
    }
  )

export default upload
