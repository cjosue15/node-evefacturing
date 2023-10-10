import { CustomError, handleErrorInstances } from "../utils/errors";
import { CategoryDTO } from "../models";
import { CategoryModel, CategorySchema, UserSchema } from "../data";

const getCategory = async (categoryId: string): Promise<CategorySchema> => {
  try {
    const categoryFound = await CategoryModel.findById(categoryId);

    if (!categoryFound)
      throw CustomError.badRequest("Category does not exists");

    return categoryFound;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const addCategory = async (categoryDto: CategoryDTO, user: UserSchema) => {
  try {
    const categoryFound = await CategoryModel.findOne({
      name: categoryDto.name,
    });

    if (categoryFound) throw CustomError.badRequest("Category already exists");

    const category = new CategoryModel({
      ...categoryDto,
      tenant: user.tenant.id,
    });

    await category.save();

    return category;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const putCategory = async (category: CategoryDTO) => {
  try {
    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
      category.id,
      {
        name: category.name,
        description: category.description,
        logo: category.logo,
      },
      {
        new: true,
      }
    );

    if (!categoryUpdated)
      throw CustomError.badRequest("Category does not exists");

    return categoryUpdated;
  } catch (error) {
    throw CustomError.internalServer(`${error}`);
  }
};

const removeCategory = async (category: CategoryDTO) => {
  try {
    const categoryDeleted = await CategoryModel.findByIdAndUpdate(
      category.id,
      {
        available: category.available,
      },
      {
        new: true,
      }
    );

    if (!categoryDeleted)
      throw CustomError.badRequest("Category does not exists");

    return categoryDeleted;
  } catch (error) {
    throw CustomError.internalServer(`${error}`);
  }
};

const listCategories = async (tenanId: string): Promise<any[]> => {
  try {
    const categories = await CategoryModel.find({
      tenant: tenanId,
      available: true,
    });

    return categories;
  } catch (error) {
    throw CustomError.internalServer(`${error}`);
  }
};

export const categoryService = {
  getCategory,
  addCategory,
  putCategory,
  removeCategory,
  listCategories,
};
