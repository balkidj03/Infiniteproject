import { model, Schema, Model, Types } from "mongoose";

export interface IContact {
  _id?: string;
  userId?: Types.ObjectId;
  contactUserId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSchema = new Schema<IContact>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactUserId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = model("Contact", contactSchema);

export default Contact;
