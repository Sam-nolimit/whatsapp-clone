import mongoose, { Schema, model, Document, Types } from "mongoose";
require("dotenv").config();

//Build a User Schema
export const FriendListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  friend_id: { type: Schema.Types.ObjectId, ref: "User" },
  email: String,
  isFavorite: String,
  firstName: String,
  lastName: String,
});

//Adding the text index to the schema will enable us to use the $text tosearch for words
FriendListSchema.index({ $firstName: "text", $lastName:"text"});

export let FriendList = model("FriendList", FriendListSchema);
