import { Router } from "express";
import validate from "../utils/validate";
import * as validators from "../validations/users";
import * as userController from "../controllers/users";
import { authenticateUser } from "../middleware/auth";
import { upload, localUpload } from "../config/multer";

const router = Router();

router.post(
  "/login",
  validate(validators.login),
  userController.authenticateUser
);

// private routes
router.use(authenticateUser());
router.get("/user", userController.getUserData);
router.get("/conversations", userController.getUserConversations);
router.get("/conversations/:conversationId", userController.getConversation);
router.post(
  "/conversations/sendMessage",
  userController.messageUpload,
  userController.addMessageToConversation
);

// validate contact
router.post("/check-user", userController.checkUserData);

router.post("/user", userController.updateUserData);
router.post(
  "/change-password",
  validate(validators.changePassword),
  userController.changePassword
);

router.post(
  "/user/profile",
  localUpload.single("profile"),
  userController.uploadProfilePic
);

export default router;
