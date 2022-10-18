import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app'
require('dotenv').config()

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  next()
})

let urlLink = process.env.MONGODB_URI as string

import Pusher from 'pusher'

const pusher = new Pusher({
  appId: '1349091',
  key: '5ffb74548f527f931d01',
  secret: '62bafe81e3cd40f3bde2',
  cluster: 'mt1',
  useTLS: true,
})

//app server
export const connect = async () => {
  try {
    await mongoose.connect(urlLink)
    console.log('Connection to MongoDB database successful')
  } catch (err: any) {
    console.error('Could not connect to MongoDB database', err.message)
  }
}


const db = mongoose.connection
db.once('open', () => {
  console.log('pusher db connected')

  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    // console.log(change)

    if(change.operationType === 'insert'){
      const messageDetails: any = change.fullDocument

      pusher.trigger('messages', 'inserted', {
        id: messageDetails.id,
        message: messageDetails.message,
        senderId: messageDetails.senderId,
        receiverId: messageDetails.receiverId,
        isRead: messageDetails.isRead,
        toFriend: messageDetails.toFriend,
        toGroup: messageDetails.toGroup,
        isDeleted: messageDetails.isDeleted,
        createdAt: messageDetails.createdAt,
        updatedAt: messageDetails.updatedAt
      })
    }
  })
})

//mongo memory server
export class MemoryServerClient {
  mongoServer
  connection

  constructor() {
    this.mongoServer = new MongoMemoryServer()
    this.connection = mongoose.connection
  }

  async connectDb() {
    await this.mongoServer.start()
    await mongoose.connect(this.mongoServer.getUri())
  }

  async stopDb() {
    await this.connection.dropDatabase()
    await this.connection.close()
    await this.mongoServer.stop()
  }
}
