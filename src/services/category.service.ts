import { CustomError, ERRORS, handleErrorInstances } from '../utils/errors';
import { CategoryDTO, PaginationDto } from '../models';
import { CategoryModel, CategorySchema, UserSchema } from '../data';
import { PaginateResult } from 'mongoose';

const getCategory = async (categoryId: string, user: UserSchema): Promise<CategorySchema> => {
  try {
    const categoryFound = await CategoryModel.findById(categoryId).where('tenant', user.tenant.id);

    if (!categoryFound) throw CustomError.badRequest(ERRORS.CATEGORY.NOT_FOUND);

    return categoryFound;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const addCategory = async (categoryDto: CategoryDTO, user: UserSchema) => {
  try {
    const categoryFound = await CategoryModel.findOne({
      name: categoryDto.name,
      tenant: user.tenant.id,
    });

    if (categoryFound) throw CustomError.badRequest(ERRORS.CATEGORY.ALREADY_EXISTS);

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

const putCategory = async (category: CategoryDTO, user: UserSchema) => {
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
    ).where('tenant', user.tenant.id);

    if (!categoryUpdated) throw CustomError.badRequest(ERRORS.CATEGORY.NOT_FOUND);

    return categoryUpdated;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const removeCategory = async (category: CategoryDTO, user: UserSchema) => {
  try {
    const categoryDeleted = await CategoryModel.findByIdAndUpdate(
      category.id,
      {
        available: category.available,
      },
      {
        new: true,
      }
    ).where('tenant', user.tenant.id);

    if (!categoryDeleted) throw CustomError.badRequest(ERRORS.CATEGORY.NOT_FOUND);

    return categoryDeleted;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const listCategories = async (pagination: PaginationDto, user: UserSchema): Promise<PaginateResult<CategorySchema>> => {
  try {
    const options = {
      page: pagination.page,
      limit: pagination.limit,
    };

    const categories = await CategoryModel.paginate({ tenant: user.tenant.id, available: true }, options);

    return categories;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

export const categoryService = {
  getCategory,
  addCategory,
  putCategory,
  removeCategory,
  listCategories,
};
