import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { loginInfo } from '../utils/interface'
export {loginInfo}  from '../utils/interface'

// Create login user token

export let createToken = (email: string) => {
  const payload = {email}

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '86400s' })

  return accessToken
}
