import mongoose, { Schema, model, Document, Types } from 'mongoose'
// import { GroupInput } from '../utils/interface'

//Build a Group Schema
const GroupSchema = new Schema(
  {
    group_name: String,
    group_image: String,
    group_desc: String,
    group_members: [String], //email address of users
    group_link: String,
    admin: [String],
  },
  {
    timestamps: true,
  }
)

export let Group = model<any>('Groups', GroupSchema)
