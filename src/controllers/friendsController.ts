import { Request, Response, NextFunction } from "express";
// import * as express from "express";
import {UserInput} from '../utils/interface'
import { User } from '../model/userModel'
import { validateEmail } from '../utils/validationFunction'
import { customRequest } from '../utils/interface'
import { friends } from '../utils/interface'
// import { FriendList } from '../model/friendListModel'
import _ from 'lodash'

//get all friends of a user
export const getAllFriends = async (
  Expressreq: Request,
  res: Response,
  next: NextFunction
) => {
  const req = Expressreq as customRequest;
  const email = req.user.email;

  try {
    const user = await User.findOne({email}).exec()
  
    
   if (!user) return res.status(400).json({ status: 'FAILED', message: 'User with the given email not found' })
   
   if (user.friends === []) return res.status(400).send('User does not have any friend. Add friends to your list')
   
   return res.status(200).json({ status: 'SUCCESS', friendList: user.friends })
   
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//add friend by email address
export const addFriend = async (
  Expressreq: Request,
  res: Response,
  next: NextFunction
) => {
  const req = Expressreq as customRequest;
  const loginEmail = req.user.email;
  const { email: friendEmail } = req.body;
  const loginId = req.user._id;
  
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({ email: loginEmail }).exec();
    console.log(user, 'user')
    let { firstName: first, lastName: last } = user;
    let userFullName = `${first} ${last}`;
  
    if (!user) return res .status(400) .json("User need to register to be able to add friend");
    const friendtoBe = await User.findOne({ email: friendEmail }).exec();
 
    if (!friendtoBe) {
      return res.status(400).json("User with the given email not found");
    }
    let { firstName, lastName, profilePic, phoneNumber, _id } = friendtoBe;
    let friendFullName = `${firstName} ${lastName}`;
   
    if (loginEmail !== friendEmail) {
      let result = user.friends.find((friend: friends) => friend.email === friendEmail);
    
      if (!result) {
        //check my friendlist
        try {
          await user.updateOne({
            $push: {
              friends: {
                email: friendEmail,
                userId: _id,
                profilePic: profilePic,
                phoneNumber: phoneNumber,
                isFavourite: false,
                fullName: friendFullName,
              },
            },
          });
          await friendtoBe.updateOne({
            $push: {
              friends: {
                userId: loginId,
                email: loginEmail,
                profilePic: profilePic,
                phoneNumber: phoneNumber,
                isFavourite: false,
                fullName: userFullName,
              },
            },
          });
          return res.status(200).send({
            message: `You have successfully added to friend list the user with the email address`,
            newFriend: {},
          });
        } catch (err: any) {
          return res.status(500).json(err.message);
        }
      } else {
        return res.status(403).json("You are already a friend to this user");
      }
    } else {
      return res.status(400).send("You can not add yourself as a friend");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

// get all user favourites
export const getAllFavourites = async (Expressreq: Request, res: Response, next: NextFunction) => {
  const req = Expressreq as customRequest
  try {
    const email = req.user.email
    const user = await User.findOne({ email }).exec()
    console.log(user)

   const favoriteFriends = user.friends.filter((friend: friends) => friend.isFavourite != false)
    
   if (!favoriteFriends) return res.send({Message: "You don't have a list of favorite friend"})
    return res.json({Status: 'Success', Favorite: favoriteFriends}).status(200)
  } catch (err: any) {
    res.status(500).json(err)
  }
}
 // add a friend to favourite using email
export const addFavourite = async (Expressreq: Request, res: Response) => {
  const req = Expressreq as customRequest;
  try {
    const loginEmail = req.user.email;
    const { email } = req.body;
    const { error } = validateEmail(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: loginEmail }).exec(); //me
    if (!user) return res.status(400).json("User not found"); //when i'm not found
    const favouriteToBe = await User.findOne({ email: email }).exec(); //get user with email
    if (!favouriteToBe)
      return res.status(400).json("User with the given email not found"); //no user with the email
    if (loginEmail !== email) {
      let result = user.friends.find( (friend: friends) => friend.email === email ); //check my friendlist
      if (result) {
        if (result.isFavourite)
          return res.send({
            Status: "Fail",
            message: "The user is already your favorite friend",
          });
        else {
          result.isFavourite = true;
          await user.save();
          return res
            .send({ 
              Status: "Success",
              favFriend: result,
            })
            .status(200);
        }
      } else {
        //  res.status(403).json('You are already a friend to this user')
          return res.send({Status: 'Fail', Message: 'This user is not in your friends list, to make the user your favorite friend, please add the user to your friend list!'}).status(404)
       }
     } else {
       return res.status(400).send('You can not add yourself as a friend')
     }
 } catch (error: any) {
      return res.status(500).json(error.message)
     
   }
  }

//get all user 
  export const allUser = async ( Expressreq: Request, res: Response, next: NextFunction ) => {
    const req = Expressreq as customRequest;
    const userId = req.user._id;

    try {
      const user = await User.find({ _id: { $ne: userId } }).select('id firstName profilePic lastName email about');
      res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json(err.message);
    }
  };