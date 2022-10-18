import { Request, Response, NextFunction } from "express";
import { UserInput } from "../utils/interface";
import {Document} from 'mongoose'
import { User } from "../model/userModel";
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import {validateGroupInfo} from '../utils/validationFunction'
import {ChatRoom} from '../model/groupModel'
import { customRequest } from "../utils/interface";
import _ from "lodash";
import { addToGroup } from '../utils/validationFunction'
import { groupInfo} from '../utils/interface'
import { any } from "joi";


//create a group chat
export async function create_group(Expressreq: Request, res: Response, next: NextFunction) {
 const req = Expressreq as customRequest;
 const { email, firstName, lastName, isVerified } = req.user
 if(isVerified === false) return res.status(400).send('Only verified user can create a group')
 try {
  // Validate the incoming request
  const { error } = validateGroupInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { group_name, group_image, group_desc } = req.body;

  const author = {
   name: `${firstName} ${lastName}`,
   email: email
  };
  const groupToken = crypto.randomBytes(16).toString("hex");


  const group_link = `http://${req.headers.host}/group/join?room=${groupToken}`;
  const group_members = [email];
  

  // Create the group
  let newGroup = await ChatRoom.create({
   group_name,
   group_image,
   group_members,
   group_desc,
   group_link,
   author
  })


  
  res.status(200).json({status: 'SUCCESS', message:`${group_name} group successfully created`, info: newGroup})
 } catch (err: any) {
  console.log(err.message);
  return res.status(400).json(err.message); 
 }
}
//join group by Link
export async function join_group(Expressreq: Request, res: Response, next: NextFunction) {
 const req = Expressreq as customRequest;
 const { email} = req.user
 let url = `http://${req.headers.host}/group${req.url}`;

 try {
  let interestGroup = await ChatRoom.findOne({group_link: url});
  if (!interestGroup) return res.status(404).send('This group does not exist')
  if (!interestGroup.group_members.includes(email)) {
   await interestGroup.updateOne({ $push: { group_members: email } })
   res.status(200).json({ status: 'SUCCESS', message: 'You have been successfully added to the group' })
  } else return res.send('You are already a member of this group')
 } catch (err: any) {
  return res.status(400).json(err.message); 
 }
}

//get all groups i'm in 
export async function get_groups(Expressreq: Request, res: Response, next: NextFunction) {
 const req = Expressreq as customRequest;
 const { email} = req.user

 try {
  let groups = await ChatRoom.find({ group_members: email }).select('group_name  group_members group_link author');
  
   res.status(200).json(groups)
   
  } catch (err: any) {
  
  return res.status(400).json(err.message); 
 }
}


// add user to your group 
export async function add_member(Expressreq: Request, res: Response, next: NextFunction) {
 const req = Expressreq as customRequest;
 const { email: loginEmail } = req.user

 const { error } = addToGroup(req.body)
 if (error) return res.status(400).send(error.details[0].message)
 
 const { email, group_link } = req.body

 
 try {
  let userToAdd = await User.findOne({ email }).exec();
  if (!userToAdd) return res.status(404).send('You cannot add user because  is not a registered email')
  // if(userToAdd.isVerified === false) return res.status(400).send('user email is not verified')
  
   //is the user an author of any group: get all his group
  let groups:any= await ChatRoom.find({ 'author.email': loginEmail }).select('group_name  group_members group_link author');
  
   if (groups) {
    let result = groups.find((group:groupInfo)=> group.group_link === group_link);
    if (!result) return res.status(404).send('Group cannot be found')
    
   
    if (!result.group_members.includes(email)) {
     result.group_members.push(email);
     await result.save()
    }else return res.status(202).send('User already exists in the group')
   } else {
    return res.status(404).send('You are not an author of any group. Create one')
   }
  res.status(200).json({ message: 'user successfully added to group' } )
   
  } catch (err: any) {

  return res.status(400).json(err.message); 
 }
}
