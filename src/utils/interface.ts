import { Date, Schema } from 'mongoose'
import {Request} from 'express'

export interface friends {
  email: string
  isFavourite: boolean
  fullName: string
}

export interface UserInput {
  firstName: string
  lastName: string
  profilePic: string
  bioData: string
  friends: friends[]
  provider: string
  about: string
  isVerified: boolean
  cloudinary_id: string
  date: Date
  emailToken: string
  email: string
  phoneNumber: string
  password: string
  _id: string
  gender: string
  favorites: [string]
  groupId: [string]
}
export interface loginInfo {
  email: string
  password: string
}
export interface customRequest extends Request {
  user: UserInput
}

type author = {
  name: string
  email: string,
}

export interface groupInfo {
_id: string
group_name: string
group_link: string
author: author
createdAt: Date
updatedAt: Date
  
  
}


export interface GroupMessageInput {
   group_name: string,
    group_image: string,
    group_desc: string,
    user: [UserInput], 
  group_link: string,
  group_message: {
    cloudinary_id: string,
    voice_note: string,
    audio: string,
    text: string,
    image: string
  }
}



export interface GroupInput {
  group_name: string
  group_image: string
  group_desc: string
  group_members: string[]
  messages: [GroupMessageInput]
  group_link: string
  author: author
}
export interface MemberInput {
  email: string,
  group_link: string 
}
