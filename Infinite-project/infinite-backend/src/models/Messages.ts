import { model, Schema, Model, Types } from "mongoose";

export interface IMessage {
  _id?: string;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "video";
  timestamp: Date;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message: Model<IMessage> = model("Message", messageSchema);

export default Message;
