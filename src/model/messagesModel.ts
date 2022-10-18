import mongoose, { Schema, model, Document, Types } from 'mongoose'
// import { MessageInput } from '../utils/interface'
//Build a Message Schema
const MessageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: 'Group',
    },
    isRead: Boolean,
    toFriend: Boolean,
    toGroup: Boolean,
    isDeleted: Boolean,
    message: String,
  },
  {
    timestamps: true,
  }
)

MessageSchema.index({ message: 'text' });

export let Message = model<any>('Messages', MessageSchema)
