import { Request} from 'express'
import jwt from 'jsonwebtoken'
import {User} from '../model/userModel'
import _ from 'lodash'

// User authentication middleware

export let authorize = async(req: Request, res: any, next: any) => {
  try {
   
    if (req.isAuthenticated()) return next()

  
    const authHeader: any = req.headers.authorization || req.headers.Authorization
  
  
   if (authHeader) {
     let token = authHeader.split(' ')[1]
     const decoded: any = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string)
   
     const user = await User.findOne({ email: decoded.email })
    let selected = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profilePic', 'isVerified'])
   
     req.user = selected
     next()
   }else {
      return res.status(401).json('No token provided. Access Denied!')
    }
  } catch (error:any) {
    res.status(404).json({
      message: error.message
    })
  }
}