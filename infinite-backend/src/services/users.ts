import { removeFileFromS3, uploadFileS3 } from "../utils/storage";
import { generateJWT, hashPassword, isPasswordSame } from "../helpers/auth";
import {
  BadRequestError,
  ConflictError,
  ResourceNotFoundError,
  ValidationError,
} from "../helpers/errors";
import * as userRepository from "../repositories/users";
import Conversation from "../models/Conversation";
import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { localUpload } from "../config/multer";

export const authenticateUser = async (payload: { [key: string]: string }) => {
  const { phone, password } = payload;

  const user = await userRepository.findUserPhone(phone.trim().toLowerCase());

  // create user if user is not exists
  if (!user) {
    const newUser = await userRepository.createNewUser({
      firstName: "",
      lastName: "",
      phone,
      password,
      status: "active",
    });

    return {
      authorization: generateJWT(
        { use: "user", id: newUser._id },
        Number(process.env.JWT_TOKEN_EXPIRY_IN_SECONDS)
      ),

      user: {
        id: newUser?._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
      },
    };
  }

  if (!isPasswordSame(password, user.password)) {
    throw new ConflictError("Invalid Phone number/password.");
  }

  if (user.status !== "active") {
    throw new ConflictError(`Your account is ${user.status}.`);
  }

  return {
    authorization: generateJWT(
      { use: "user", id: user._id },
      Number(process.env.JWT_TOKEN_EXPIRY_IN_SECONDS)
    ),

    user: {
      id: user?._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
  };
};

export const checkUserData = async (payload: { phone: string }) => {
  const user = await userRepository.findOne({ phone: payload?.phone });
  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }
  return {
    _id: user._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    profile: user?.profile,
  };
};

export const updateUserData = async (
  user: { [key: string]: any },
  payload: { [key: string]: any }
) => {
  if (payload.firstName) {
    user.firstName = payload.firstName;
  }

  if (payload.lastName) {
    user.lastName = payload.lastName;
  }

  await user.save();

  return {
    id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName, 
    phone: user?.phone,
    profile: user?.profile,
  };
};

export const changePassword = async (
  user: { [key: string]: any },
  password: string,
  oldPassword: string
) => {
  if (!isPasswordSame(oldPassword, user.password)) {
    throw new ValidationError("old password is not the same");
  }

  const newPassword: string = await hashPassword(password);

  user.password = newPassword;
  await user.save();

  return {};
};

export const uploadProfilePic = async (
  user: { [key: string]: any },
  filePath: string
) => {
  user.profile = filePath;
  await user.save();
};
//
export const getUserConversations = async (userId: string) => {
  const conversations = await Conversation.find({ participants: userId })
    .populate("participants", "id firstName lastName profile phone")
    .populate("messages.sender", "id firstName lastName profile phone");

  return conversations;
};

//
export const getConversation = async (
  userId: string,
  conversationId: string
) => {
  if (!conversationId || !userId) {
    throw new ConflictError("Please provide conversation id");
  }

  const conversation = await Conversation.findById({
    _id: new mongoose.Types.ObjectId(conversationId),
  })
    .populate("participants", "id firstName lastName profile phone")
    .populate("messages.sender", "id firstName lastName profile phone");

  if (!conversation) {
    throw new BadRequestError("Conversation not found");
  }

  return conversation;
};

//
// export const sendMessage = async (
//   userId: string,
//   payload: { [key: string]: any }
// ) => {
//   const { recipient, text } = payload;

//   const sender = userId;

//   if (!sender || !recipient || !text) {
//     throw new BadRequestError("Sender, recipient, and text are required");
//   }

//   // Check if a conversation between these participants exists
//   let conversation = await Conversation.findOne({
//     participants: { $all: [sender, recipient] },
//   });

//   // If no conversation exists, create a new one
//   if (!conversation) {
//     conversation = new Conversation({
//       participants: [sender, recipient],
//       messages: [],
//     });
//   }

//   // Add the new message to the conversation
//   const newMessage = {
//     sender: new mongoose.Types.ObjectId(sender),
//     text,
//     timestamp: new Date(),
//   };

//   conversation.messages.push(newMessage);
//   await conversation.save();

//   return conversation;
// };

export const sendMessage = async (
  userId: string,
  payload: { [key: string]: any }
) => {
  const { recipient, text, audio, video, image } = payload;

  const sender = userId;

  if (!sender || !recipient || (!text && !audio && !video && !image)) {
    throw new BadRequestError(
      "Sender, recipient, and at least one message content are required"
    );
  }

  // Check if a conversation between these participants exists
  let conversation = await Conversation.findOne({
    participants: { $all: [sender, recipient] },
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = new Conversation({
      participants: [sender, recipient],
      messages: [],
    });
  }

  // Add the new message to the conversation
  const newMessage = {
    sender: new mongoose.Types.ObjectId(sender),
    text,
    audio,
    video,
    image,
    timestamp: new Date(),
  };

  conversation.messages.push(newMessage);
  await conversation.save();

  return conversation;
};
