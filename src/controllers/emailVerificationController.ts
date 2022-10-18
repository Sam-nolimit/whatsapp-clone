import { Request, Response, NextFunction } from 'express'
import {User} from '../model/userModel'



// Check if the user is verified with the verification link that was sent to the user
export const emailVerified = async (req: Request, res: Response) => {
try{
  const token = req.query.token;
  // Set isVerified to true and emailToken to null once the user is verified
  let user = await User.findOne({ emailToken: token }).exec();
  if(!user) return res.send({Message : 'User already verified or link not valid!'})
  res.send({ Message: "You have been successfully verified" });
  user.emailToken = '';
  user.isVerified = true;
  await user.save();
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
