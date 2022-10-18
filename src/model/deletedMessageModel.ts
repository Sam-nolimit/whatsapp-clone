import mongoose, { Schema, model, Document, Types } from 'mongoose'
// import { MessageInput } from '../utils/interface'
//Build a Message Schema
const deletedMessageSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    messageId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: 'Groups',
    },
  },
  {
    timestamps: true,
  }
)
export let deletedMessages = model<any>('deletedMessages', deletedMessageSchema)
