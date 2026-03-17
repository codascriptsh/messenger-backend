require('dotenv').config()
import mongoose from 'mongoose'

const dbCusterName = process.env.DATABASE_CUSTERNAME
const dbUser = process.env.DATABASE_USERNAME
const dbPassword = process.env.DATABASE_PASSWORD

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbCusterName}.zy4wj6r.mongodb.net/?appName=${dbCusterName}`
const dbCusterNameUpperCase = dbCusterName.toLocaleUpperCase()

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connectToDatabase = () => {
  mongoose.connect(connectionString, connectionOptions)
    .then((connection) => {
      console.log(`[DATABASE] Connected successfully to the ${dbCusterNameUpperCase} database!`)
      return connection
    })
    .catch((error) => {
      console.log(`[DATABASE] Failed to connect to the ${dbCusterNameUpperCase} database: ${error}`)
    })
}

export default connectToDatabase
