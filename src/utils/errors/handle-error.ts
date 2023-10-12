import { Response } from "express";
import { CustomError } from "./custom.error";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.message);
  }

  return res.status(500).json("Internal server error");
};

export const handleErrorInstances = (error: unknown) => {
  if (error instanceof CustomError) {
    return error;
  }

  return CustomError.internalServer(`${error}`);
};
