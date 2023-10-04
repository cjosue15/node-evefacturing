import { Request, Response } from "express";

import { register } from "../services";
import { RegisterDTO } from "../models";
import { handleError } from "../utils/errors/handle-error";

export const registerUser = async (request: Request, response: Response) => {
  const [errors, registerDto] = RegisterDTO.create(request.body);

  if (errors) {
    return response.status(400).json({ errors });
  }

  try {
    const data = await register(registerDto);
    response.cookie("token", data.token);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};
