import { body, query, param } from "express-validator";

export const register = [
  body("firstName").isString(),
  body("lastName").isString(),
  body("email", "Email address provided is invalid").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const googleSign = [
  body("firstName").isString(),
  body("lastName").isString(),
  body("email", "Email address provided is invalid").isEmail(),
  body("id", "Id is required").isString(),
]


export const facebookSign = []

export const login = [
  body("phone", "Phone number provided is invalid").isString(),
  body("password", "Password is required").isString(),
];

export const changePassword = [
  body("oldPassword", "Old Password is required").isString(),
  body("password", "new password is required").isString(),
];
