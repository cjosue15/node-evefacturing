import { bcryptAdapter } from "../config/bcrypt.adapter";
import { TenantModel, UserModel } from "../data";
import { RegisterDTO } from "../models";
import { CustomError } from "../utils/errors/custom.error";

const USER_ROLE_DEFAULT = "admin";

export const register = async (userDto: RegisterDTO) => {
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

    return {
      user: user,
      tenant: tenant,
    };
  } catch (error) {
    throw CustomError.internalServer(`${error}`);
  }
};
