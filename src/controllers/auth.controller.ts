import { Request, Response } from "express";

import { login, register } from "../services";
import { LoginDTO, RegisterDTO } from "../models";
import { handleError } from "../utils/errors";

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

export const loginUser = async (req: Request, res: Response) => {
  const [error, loginUserDto] = LoginDTO.create(req.body);

  if (error) return res.status(400).json({ error });

  try {
    const data = await login(loginUserDto);
    res.cookie("token", data.token);
    return res.json(data);
  } catch (error) {
    return handleError(error, res);
  }
};
