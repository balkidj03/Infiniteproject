import { model, Schema, Document, Types, Model } from "mongoose";

// Define the IConversation interface extending Document for Mongoose integration
export interface IConversation extends Document {
  _id?: string;
  participants: Types.ObjectId[];
  messages: {
    sender: Types.ObjectId;
    text: string;
    audio?: string;
    video?: string;
    image?: string;
    timestamp: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String },
        audio: { type: String },
        video: { type: String },
        image: { type: String },
        timestamp: { type: Date, default: Date.now, required: true },
      },
    ],
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Create the model
const Conversation: Model<IConversation> = model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
