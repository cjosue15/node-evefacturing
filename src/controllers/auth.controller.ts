import { Request, Response } from "express";

import { authService } from "../services";
import { LoginDTO, RegisterDTO } from "../models";
import { handleError } from "../utils/errors";

const SESSION = "session";
const USER = "user";

const saveInCookies = (response: Response, token: string, user: string) => {
  response.cookie(SESSION, token);
  response.cookie(USER, user);
};

export const registerUser = async (request: Request, response: Response) => {
  const [errors, registerDto] = RegisterDTO.create(request.body);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const data = await authService.register(registerDto!);
    saveInCookies(response, data.token, JSON.stringify(data.user));
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const [error, loginUserDto] = LoginDTO.create(req.body);

  if (error) return res.status(400).json(error);

  try {
    const data = await authService.login(loginUserDto!);
    saveInCookies(res, data.token, JSON.stringify(data.user));
    return res.json(data);
  } catch (error) {
    return handleError(error, res);
  }
};

export const logoutUser = async (_: Request, res: Response) => {
  res.clearCookie("token", { expires: new Date() });
  return res.status(200).json("Logout successful");
};
