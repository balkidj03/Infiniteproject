import * as dotenv from "dotenv";
import { Request, RequestHandler, Response, NextFunction } from "express";
import * as userServices from "../services/users";
import { responseHandler } from "../helpers";
import { ValidationError } from "../helpers/errors";

dotenv.config();

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/profile/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

export const messageUpload = upload.fields([
  { name: "audio", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

export const authenticateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await userServices.authenticateUser(req.body);
    res.json(responseHandler(response, "Login successful."));
  } catch (error) {
    next(error);
  }
};

export const checkUserData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await userServices.checkUserData(req.body);
    res.json(responseHandler(response, "Login successful."));
  } catch (error) {
    next(error);
  }
};

export const getUserData: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    const profileUrl = `${req.protocol}://${req.get(
      "host"
    )}/${user.profile.replace(/\\/g, "/")}`;
    let response: { [key: string]: any } = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      profile: profileUrl,
    };

    res.json(responseHandler(response, "User Data Fetch successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateUserData: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const response = await userServices.updateUserData(user, req.body);

  try {
    res.json(responseHandler(response, "User Data Update successfully"));
  } catch (error) {
    next(error);
  }
};

export const changePassword: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const password: string = req.body.password;
  const oldPassword: string = req.body.oldPassword;

  try {
    const response = await userServices.changePassword(
      user,
      password,
      oldPassword
    );
    res.json(responseHandler(response, "User Password change successfully"));
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePic: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    if (!req.file) {
      throw new ValidationError("No file uploaded");
    }

    const profile = req.file.path;

    const response = await userServices.uploadProfilePic(user, profile);

    res.json(responseHandler(response, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const getUserConversations: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const response = await userServices.getUserConversations(userId);
    res.json(responseHandler(response));
  } catch (error) {
    next(error);
  }
};

export const getConversation: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const conversationId = req.params.conversationId;

    const response = await userServices.getConversation(userId, conversationId);

    res.json(responseHandler(response));
  } catch (error) {
    next(error);
  }
};

// export const addMessageToConversation: RequestHandler = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.user._id;
//     const response = await userServices.sendMessage(userId, req.body);
//     res.json(responseHandler(response));
//   } catch (error) {
//     next(error);
//   }
// };

export const addMessageToConversation: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;

    // Extract file data
    const audio = req.files.audio ? req.files.audio[0].path : null;
    const video = req.files.video ? req.files.video[0].path : null;
    const image = req.files.image ? req.files.image[0].path : null;

    const payload = {
      ...req.body,
      audio,
      video,
      image,
    };

    const response = await userServices.sendMessage(userId, payload);
    res.json(responseHandler(response));
  } catch (error) {
    next(error);
  }
};
