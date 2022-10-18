import { Request, Response, NextFunction } from 'express'
import { User } from '../model/userModel'
import {UserInput} from '../utils/interface'
import jwt from 'jsonwebtoken'
import { customRequest } from '../utils/interface'
import { transporter } from '../controllers/userAuthController'

// Email validation module

export const emailVerification = (req: Request, newUser: any) => {
  const validationEmail = {
    from: " 'Email Verification' <xnotime247@gmail.com> ",
    to: newUser.email,
    subject: "Whatsappclone - Email Verification",
    html: `<h2> ${newUser.firstName}! Thank you for using whatsappclone </h2>
      <h3>Please verify your email to complete the registration...</h3>
      Kindly click this <a href="http://${req.headers.host}/users/newuser/verify-email?token=${newUser.emailToken}"><b>Link</b></a>`,
  };
  return validationEmail;
};

export const updateUser = async (userId: string, req: Request, res: Response) => {

  const editProfile = await User.findOne({ _id: userId })
  if (!editProfile)
    return res.status(404).send({ Message: "User does not exist" });
  let { firstName, lastName, profilePic, phoneNumber, about, cloudinary_id } =
    req.body;
  editProfile.firstName = firstName ? firstName : editProfile.firstName;
  editProfile.lastName = lastName ? lastName : editProfile.lastName;
  editProfile.phoneNumber = phoneNumber ? phoneNumber : editProfile.phoneNumber;
  (editProfile.about = about ? about : editProfile.about),
    (editProfile.cloudinary_id = cloudinary_id
      ? cloudinary_id 
      : editProfile.cloudinary_id),
    (editProfile.profilePic = profilePic ? profilePic : editProfile.profilePic);

  await editProfile.save();
  return res.status(200).send({
    Message: "User has been successfully updated",
    update: editProfile, 
  });
};

export const isverified = async (Expressreq: Request, res: Response, next: NextFunction) => {
  const req = Expressreq as customRequest;
  const email = req.user.email;

  try {
    
    const user = await User.findOne({ email}).exec();
    if(!user) return res.send({Message: 'Invalid parameter supplied!'}).status(400)
    // console.log(user, "user");
    // Check if the user has been verifired. If not, resend another email verifucation to the user

    if (!user.isVerified) {
      // Confirm that the email has been sent to the user
      // console.log("Enteredusernot verified");
      transporter.sendMail(
        emailVerification(req, user),
        (error: any, info: any) => {
          console.log("Sending mail...");

          if (!error) {
            console.log("Mail sent!");
            return res.send({message: "User has not been verified: Verification email has been sent to your email account",}).status(200);
            next();
          } else {
            console.log(error.message);
          }
        }
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
