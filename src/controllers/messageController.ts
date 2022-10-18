import { Message } from "../model/messagesModel";
import express, { Response, Request, NextFunction } from "express";
import { customRequest } from '../utils/interface';
import { deletedMessages } from "../model/deletedMessageModel";
const cloudinary = require("cloudinary").v2;

export const getPrivateMessages = async (Expressreq: Request, res: Response, next: NextFunction) => {
  try {
    const req = Expressreq as customRequest;
    const id = req.user._id;
    const sentMessages = await Message.find({
      senderId: id,
      isDeleted: false,
    });

    const receivedMessages = await Message.find({
      receiverId: id,
      isDeleted: false,
    });

    res.status(200).json({ ...sentMessages, ...receivedMessages });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getGroupMessages = async (
  Expressreq: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = Expressreq.params.groupId;
    const req = Expressreq as customRequest;
    const userId = req.user._id;
    const sentMessages = await Message.find({
      senderId: userId,
      toGroup: true,
      isDeleted: false
    });

    const deleted: any = await deletedMessages.find({ userId, groupId });

    const allReceivedMessages = await Message.find({
      receiverId: userId,
      isDeleted: false,
      toGroup: true
    });

    let notDeleted: any;

    if (!allReceivedMessages)
      res
        .status(400)
        .json({ invalidRequest: "no group joined or no message received" });

    if (deleted) {
      notDeleted = allReceivedMessages.filter((messages) => {
        if (deleted.userId !== messages.receiverId) return messages;
      });
    }

    res.status(200).json({ messages: [...sentMessages, ...notDeleted] });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createPrivateMessages = async (Expressreq: Request, res: Response, next: NextFunction) => {
  try {
    const req = Expressreq as customRequest | any;
    const receiverId = Expressreq.params.receiverId;
    const senderId = req.user._id;

    let result: any
    if (req.files){
    result = await cloudinary.uploader.upload(
        req.files.messageContent.tempFilePath,
        {
          use_filename: true,
          folder: "whatsapp-clone-uploads",
        }
      )
    }

    let { messageContent } = req.body; //add the receiver's id to the body. The id must be someone you have added as a friend or favorite
    
    let message = '';

    if(messageContent) message = messageContent;

    
    if(req.files) message = result.secure_url;

    let isRead = false,
      toFriend = true,
      toGroup = false,
      isDeleted = false

    const newMessage = await Message.create({
      message,
      senderId,
      receiverId,
      isRead,
      toFriend,
      toGroup,
      isDeleted
    });

    res
      .status(200)
      .json({
        message: "successful",
        newMessage
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createGroupMessages = async ( Expressreq: Request, res: Response, next: NextFunction ) => {
  try {
    const req = Expressreq as customRequest | any;
    const senderId = req.user._id
    const groupId = req.params.groupId

    let result: any

    if (req.files){
    result = await cloudinary.uploader.upload(
        req.files.messageContent.tempFilePath,
        {
          use_filename: true,
          folder: "whatsapp-clone-uploads",
        }
      );
    }

    const { text } = req.body;
    let details = [];

    if (text) details.push(text);
    if (req.files) details.push(result.secure_url);

    const isRead = false,
      toFriend = false,
      toGroup = true;
    const newMessage = await Message.create({
      message: details,
      groupId,
      senderId,
      isRead,
      toFriend,
      toGroup,
      isDeleted: false,
    });

    res.status(200).json({ message: "successful", newMessage });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export async function deletePrivateMessage(Expressreq: Request, res: Response) {
  const req = Expressreq as customRequest;

  const messageId  = req.params.messageId;
  const  id = req.user._id;

  const chat = await Message.findOne({ _id: messageId });

  if (!chat) {
    res.status(404).json({
      error: "Unable to delete, Chat not found",
    });
  }

  if (chat.senderId.equals(id)) {
    chat.isDeleted = true;
    await chat.save()
    res.status(200).json({
      msg: "Chat deleted",
      chat
    }) 
  } else if (chat.receiverId.equals(id)) {
    chat.receiverId = null;
    await chat.save();
    res.json({
      msg: "Chat deleted",
      chat,
    });
  } else {
    res.json({
      msg: "cannot delete this chat",
    });
  }
}

export async function deleteGroupMessage(Expressreq: Request, res: Response) {
    const req = Expressreq as customRequest;
  
    const messageId = req.params.messageId; //this is the id of the message in the group
    const id = req.user._id;
    const chat = await Message.findOne({ _id: messageId });

    if (!chat) {
        res.status(404).json({
          error: "Unable to delete, Chat not found",
        });
      }else if (chat.senderId.equals(id)) {
        chat.isDeleted = true;
        await chat.save()
        res.status(200).json({
          msg: "Chat deleted",
          chat
        }) 
      } else {
        const groupId = chat.groupId
        const deleted = await deletedMessages.create({ userId: id, messageId, groupId });
        res.json({
            msg: `Chat was deleted by ${id}`,
            deleted
          });
      }
  }

