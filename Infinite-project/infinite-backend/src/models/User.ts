import { model, Schema, Model, Types } from "mongoose";

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  profile?: string;
  status?: "unverified" | "active" | "suspended";

  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      maxlength: 30,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unverified", "active", "suspended"],
      default: "unverified",
    },
  },
  { timestamps: true }
);
const User: Model<IUser> = model("User", userSchema);

export default User;
