import { NextFunction, RequestHandler } from "express";
import { AuthenticationError, ConflictError } from "../helpers/errors";
import { validateJWTToken } from "../helpers/auth";
import User from "../models/User";

export const authenticateUser =
  (): RequestHandler => async (req: any, _res, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new AuthenticationError("An authorization token is required.");
      }

      let id: string, use: string;
      try {
        ({ id, use } = await validateJWTToken(authorization!));
      } catch (error) {
        throw new AuthenticationError(
          "Authorization token is invalid or has expired."
        );
      }

      if (!id || use !== "user") {
        throw new AuthenticationError(
          "Authorization token is invalid or has expired."
        );
      }

      const user = await User.findById({ _id: id });

      if (!user) {
        throw new AuthenticationError(
          "Authorization token is invalid or has expired."
        );
      }

      if (user.status !== "active") {
        throw new ConflictError(`Your account is ${user.status}`);
      }

      req.user = user;

      return next();
    } catch (error) {
      return next(error);
    }
  };
