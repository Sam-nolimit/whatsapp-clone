import { ChatRoom } from "../model/groupModel";
import { User } from "../model/userModel";
import jwt from 'jsonwebtoken'

export async function generateUniqueLink(author: string, email: string) {
  try {
    let group = await ChatRoom.find({author}).exec()
    console.log(group)
    let nextNum = group === [] ? 1 : group.length
    let payload = `${email}${nextNum}`
    const groupToken = jwt.sign(payload, process.env.GROUP_TOKEN_SECRET as string)
    return groupToken
  } catch (err:any) {
    console.log(err.message)
  }

}

