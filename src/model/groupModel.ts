import mongoose, { Schema, model, Document, Types } from 'mongoose'
import { UserSchema } from './userModel'
import { GroupInput } from '../utils/interface'

//Build a Group Schema
const GroupSchema = new Schema<GroupInput>(
  {
    group_name: String,
    group_image: String,
    group_desc: String,
    group_members: {
      type: [String],
      validate: [arrayLimit, 'Group cannot exceeds the limit of 300'],
    },
    group_link: String,
    // isAdmin: [String],
    author: {
      name: String,
      email: String 
    }
  },
  {
    timestamps: true,
  }
)
function arrayLimit(val: string[]): boolean {
  return val.length <= 300
}
export let ChatRoom = model<GroupInput>('ChatRoom', GroupSchema)


