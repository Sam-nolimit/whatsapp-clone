import { Request, Response} from 'express'
import { User } from '../model/userModel'
import { customRequest } from "../utils/interface";
import {  updateUser } from '../middlewares/modules'

// Update user handler
export const updateUserProfile = async (Expressreq: Request, res: Response) => {
  const req = Expressreq as customRequest;
  try {
    updateUser(req.user['_id'], req, res);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

// Get user profile handler
export const userProfile = async (Expressreq: Request, res: Response) => {
  const req = Expressreq as customRequest;
  try {
    const userId  = req.user["_id"] ;
    const userProfile = await User.findOne({ _id: userId }).exec();
    if (!userProfile) return res.status(404).send({ Message: "User does not exist" });
    // if (!userId) return res.status(404).send({ Message: "User does not exist" });
    // res.status(200).send(userProfile);
    const { firstName, lastName, email, phoneNumber, profilePic, about} = userProfile
    res.status(200).send({
      Message: 'Success',
      Name: `${firstName} ${lastName}`,
      email: email,
      phoneNumber,
      profilePic,
      about,
    });
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};
