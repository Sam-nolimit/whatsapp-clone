import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../model/userModel'
import { ChatRoom } from '../model/groupModel'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { validateLogin, validateSignUp } from '../utils/validationFunction'
import {createToken} from "../utils/accessTokenGenerator"
import { emailVerification } from '../middlewares/modules'
import _ from 'lodash'
import { HttpError } from 'http-errors'

//Setup email verification variables by intializing nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  },
  tls:{
    rejectUnauthorized: false 
  }
})


// User signup Module
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
  // Validate the incoming request
  const { error } = validateSignUp(req.body)
  if (error) return res.status(400).send(error.details[0].message)
    const { firstName, lastName, email, phoneNumber, password } = req.body
    
    // Check if the user already exist in the database
    let user = await User.findOne({ $or: [{ email }, { phoneNumber }] })
    if (user) return res.status(400).send({ Message: "Email or Phone Number already exist" })
    
    // Encrypt or Hash the user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const randomNumber = crypto.randomBytes(64).toString('hex')
    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      emailToken: randomNumber,
      phoneNumber,
      cloudinary_id:"",
      profilePic:"https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
      password: hashPassword,
      isVerified: false
    })

    
    // Confirm that the email has been sent to the user
      transporter.sendMail(emailVerification(req, newUser), (error: any, info: any) =>{
          if (error) return res.status(400).json(error.message)
          else res.send({message: 'Verification email has been sent to your email account', emailToken: newUser.emailToken}).status(200)
      })
  } catch (error: any) {
      return res.status(400).json(error.message) 
  } 
}                                                                                                    



// User Login Module
export const login = async (req: Request, res: Response, next: NextFunction) =>{
  try{
    // Vallidate the incooming request
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;

    // Check if the user already exist in the database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ Message: "User not found" });

    // Decrypt or Unash the user password and compare
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      return res.status(401).send({ Message: "User is not authorized" });

    const token = createToken(email);

    // res.cookie("jwtToken", token, {
    //   maxAge: 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // })

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      email: user.email,
      profilePic: user.profilePic,
    };

    
    res
      .header("x-auth-token", token)
      .status(200)
      .send({
        Message: "User successfuly login",
        accessToken: token,
        userData,
      });
  }catch (error: any) {
    res.json(error.message)
}
}


//logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
   res.clearCookie("refreshtoken");
    res.clearCookie("x-auth-token");
    req.logOut();
   
    res.status(200).send({ message: "User sucesssfuly logout" });
    res.redirect("/");
  } catch (error:any) {
    res.json(error.message);
  }

}


// Get basic information about other user
export const otherUserInfo = async (req:Request, res:Response) =>{
  try{
    // get the user id and check if the user exist

    
    const otherUserId = req.params.userId
    const otherUser = await User.findById({ _id: otherUserId })    
    if(!otherUser) return res.send({Message: 'User does not exist'}).status(404)
    const { _id, firstName, email, phoneNumber, lastName, profilePic, about } = otherUser
    res
      .send({
        userId: _id, 
        Name: `${firstName} ${lastName}`,
        Image: profilePic,
        Email: email,
        Phone: phoneNumber,
        About: about,
      })
      .status(200);

  }catch(error: any){
    return res.status(400).json(error.message)
  }
}

// Get basic information about other user

export const getGroupInfo = async (req:Request, res:Response) =>{
  try{

    // get the group's id and check if the group exist exist

    const groupId = req.params.groupId

    const group = await ChatRoom.findById({_id: groupId})
    if(!group) return res.send({Message: 'Group does not exist'}).status(404)
    const { group_name, group_image, group_desc, group_members, group_link } = group
    res.send({groupName: group_name, groupImage: group_image, groupDescription: group_desc, groupMembers: group_members, groupLink: group_link}).status(200)

  }catch(error: any){
   return res.status(400).json(error.message);
  }
}
