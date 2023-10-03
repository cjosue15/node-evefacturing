import { Request, Response } from "express";

import { register } from "../services";
import { RegisterDTO } from "../models";

export const registerUser = async (request: Request, response: Response) => {
  const [errors, registerDto] = RegisterDTO.create(request.body);

  console.log(registerDto);

  if (errors) {
    return response.status(400).json({ errors });
  }

  try {
    const user = await register(registerDto);
    return response.json(user);
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
