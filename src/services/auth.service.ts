import { Request } from "express";
import { bcryptAdapter } from "../config/bcrypt.adapter";
import { TenantModel, TenantSchema, UserModel, UserSchema } from "../data";
import { LoginDTO, RegisterDTO } from "../models";
import { CustomError, handleErrorInstances } from "../utils/errors";
import { JwtAdapter } from "../config";

const USER_ROLE_DEFAULT = "admin";

interface RegisterResponse {
  user: UserSchema;
  tenant: TenantSchema;
  token: string;
}

interface LoginResponse {
  user: UserSchema;
  token: string;
}

const register = async (userDto: RegisterDTO): Promise<RegisterResponse> => {
  try {
    const existUser = await UserModel.findOne({ email: userDto.email });
    if (existUser) throw CustomError.badRequest("User already exists");
    const tenant = new TenantModel({
      tenant: userDto.tenant,
      logo: null,
    });
    const user = new UserModel({
      ...userDto,
      tenant: tenant.id,
      role: USER_ROLE_DEFAULT,
    });

    user.password = bcryptAdapter.hash(user.password);

    await user.save();
    await tenant.save();

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      user,
      tenant,
      token,
    };
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const login = async (loginDto: LoginDTO): Promise<LoginResponse> => {
  try {
    const userFound = await UserModel.findOne({ email: loginDto.email });
    if (!userFound)
      throw CustomError.badRequest("Invalid credentials email or password");

    const isMatching = bcryptAdapter.compare(
      loginDto.password,
      userFound.password
    );

    if (!isMatching)
      throw CustomError.badRequest("Invalid credentials email or password");

    const token = await JwtAdapter.generateToken({ id: userFound.id });

    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      user: userFound,
      token,
    };
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const getCurrentUser = (request: Request): UserSchema => {
  return request.body.user as UserSchema;
};

export const authService = {
  register,
  login,
  getCurrentUser,
};
