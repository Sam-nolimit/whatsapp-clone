
import mongoose, { Schema, model, Document, Types } from 'mongoose'
import { UserInput } from '../utils/interface'
import jwt from 'jsonwebtoken'
require('dotenv').config()
//Build a User Schema
export const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Enter your first name"],
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Enter your last name"],
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    max: 50,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [
      /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
      "Please enter 11 digits valid Nigeria mobile number",
    ],
  },
  isVerified: Boolean,

  profilePic: String,
  emailToken: String,
  cloudinary_id: String,
  password: {
    type: String,
    min: 5,
    max: 200,
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
  bioData: String,
  friends: {
    type: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        email: String,
        isFavourite: {
          type: Boolean,
          default: false,
        },
        fullName: String,
        profilePic: String,
        phoneNumber: String,
      },
    ],
  },
  about: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  gender: String,

  groupId: [{ type: Schema.Types.ObjectId, ref: "Group" }],
});

//Adding the text index to the schema will enable us to use the $text tosearch for words
UserSchema.index({ request: "text" });

export let User = model("User", UserSchema);
