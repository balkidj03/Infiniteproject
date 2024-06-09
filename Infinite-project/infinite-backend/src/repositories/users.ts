import User, { IUser } from "../models/User";
import { hashPassword } from "../helpers/auth";

export const findUserPhone = async (phone: string) => {
  return User.findOne({ phone });
};

export const findOne = async (query: { [key: string]: any }) => {
  return User.findOne(query);
};

export const createNewUser = async (user: IUser) => {
  return User.create({
    ...user,
    password: await hashPassword(user.password),
  });
};

export const findOneAndUpdate = async (
  filter: { [key: string]: any },
  update: { [key: string]: any }
) => {
  return User.findOneAndUpdate(filter, update);
};
