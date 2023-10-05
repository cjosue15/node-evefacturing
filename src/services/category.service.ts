import { CustomError, handleErrorInstances } from '../utils/errors';
import { CategoryDTO } from '../models';
import { CategoryModel, UserSchema } from '../data';

// interface CategoriesResponse {
//   categories: CategoryModel[];
// }
//
export const addCategory = async (registerDto: CategoryDTO, user: UserSchema) => {
  try {
    const categoryFound = await CategoryModel.findOne({
      name: registerDto.name,
    });

    if (categoryFound) throw CustomError.badRequest('Category already exists');

    const category = new CategoryModel({
      ...registerDto,
      tenant: user.tenant.id,
    });

    await category.save();

    return category;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

export const listCategories = async (tenanId: string): Promise<any[]> => {
  try {
    const categories = await CategoryModel.find({ tenant: tenanId });

    return categories;
  } catch (error) {
    throw CustomError.internalServer(`${error}`);
  }
};
