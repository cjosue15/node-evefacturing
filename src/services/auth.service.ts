import { Document } from "mongoose";
import { bcryptAdapter } from "../config/bcrypt.adapter";
import { TenantModel, TenantSchema, UserModel } from "../data";
import { RegisterDTO } from "../models";
import { CustomError } from "../utils/errors/custom.error";
import { JwtAdapter } from "../config/jwt.adapter";

const USER_ROLE_DEFAULT = "admin";

interface RegisterResponse {
  user: Document<any>;
  tenant: Document<TenantSchema>;
  token: string;
}

export const register = async (
  userDto: RegisterDTO
): Promise<RegisterResponse> => {
  const existUser = await UserModel.findOne({ email: userDto.email });
  if (existUser) throw CustomError.badRequest("User already exists");

  try {
    const tenant = new TenantModel({
      tenant: userDto.tenant,
      logo: null,
    });
    const user = new UserModel({
      ...userDto,
      tenant: tenant._id,
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
    throw CustomError.internalServer(`${error}`);
  }
};
