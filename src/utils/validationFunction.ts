import joi from 'joi'
import { MemberInput, UserInput } from './interface'
import { GroupInput } from './interface'


//user joi validation Signin
export function validateSignUp(user: UserInput) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().max(50).required(),
    phoneNumber: joi.string().length(11).required(),
    password: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}
//user joi validation Login
export let validateLogin = (user: UserInput) => {
  const schema = joi.object({
    email: joi.string().email().max(50).required(),
    password: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}
// user joi validation for email
export let validateEmail = (user: UserInput) => {
  const schema = joi.object({
    email: joi.string().max(50).required(),
  })
  return schema.validate(user)
}
export function validateChangePass(userPass: any) {
  const schema = joi.object({
    password: joi.string().min(6).max(200).required(),
    passConfirm: joi.string().min(6).max(200).required(),
    oldpassword: joi.string().required()
  });
  return schema.validate(userPass)
}
export function validatePasswordReset(userReset: any) {
  const schema = joi.object({
    password: joi.string().min(6).max(200).required(),
    passConfirm: joi.string().min(6).max(200).required(),
  })
  return schema.validate(userReset)
}

export function validateGroupInfo(groupdata: GroupInput) {
  const schema = joi.object({
     group_name: joi.string().min(4).max(35).required(),
    group_image: joi.string(),
    group_desc: joi.string().min(10).max(100),
    group_link: joi.string(),
    author: joi.array()
  })
  return schema.validate(groupdata)
}
export function addToGroup(memberInput: MemberInput) {
  const schema = joi.object({
    email: joi.string().email().required(),
    group_link: joi.string().required(),
  })
  return schema.validate(memberInput)
}