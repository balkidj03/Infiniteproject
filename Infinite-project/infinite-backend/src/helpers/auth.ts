import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addSeconds } from "date-fns";
import * as dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isPasswordSame = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

export const generateJWT = (
  payload: { [key: string]: any },
  expiry: number = 604800
) => {
  const jwt_key: any = process.env.JWT_SECRET;

  return {
    expiry: addSeconds(new Date(), Number(expiry)),
    token: jwt.sign(payload, jwt_key, {
      expiresIn: expiry,
      issuer: "Infinite",
    }),
  };
};

export const validateJWTToken = (authorization: string): any => {
  const token = authorization?.split("Bearer ")[1];

  const jwt_key: any = process.env.JWT_SECRET;

  return jwt.verify(token, jwt_key);
};
