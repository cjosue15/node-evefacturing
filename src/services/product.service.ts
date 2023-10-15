import { CustomError, ERRORS, handleErrorInstances } from '../utils/errors';
import { PaginationDto, ProductDTO } from '../models';
import { CategoryModel, CategorySchema, ProductModel, ProductSchema, TagModel, TagSchema, UserSchema } from '../data';
import { PaginateResult } from 'mongoose';

const getProducts = async (pagination: PaginationDto, user: UserSchema): Promise<PaginateResult<ProductSchema>> => {
  try {
    const options = {
      page: pagination.page,
      limit: pagination.limit,
    };

    const products = await ProductModel.paginate({ tenant: user.tenant.id, active: true }, options);

    return products;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const getProduct = async (tagId: string, user: UserSchema): Promise<ProductSchema> => {
  try {
    const productFound = await ProductModel.findById<ProductSchema>(tagId)
      .where('tenant', user.tenant.id)
      .where('active', true);

    if (!productFound) throw CustomError.badRequest(ERRORS.PRODUCT.NOT_FOUND);

    return productFound;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const addProduct = async (productDto: ProductDTO, user: UserSchema): Promise<ProductSchema> => {
  try {
    const [categoryFound, tagFound] = await checkIfCategoryAndTagExists(
      productDto.categoryId,
      productDto.tagId,
      user.tenant.id
    );

    if (!categoryFound) throw CustomError.badRequest(ERRORS.CATEGORY.NOT_FOUND);
    if (!tagFound) throw CustomError.badRequest(ERRORS.TAG.NOT_FOUND);

    const productFound = await ProductModel.findOne({
      name: productDto.name,
      tenant: user.tenant.id,
    });

    if (productFound) throw CustomError.badRequest(ERRORS.PRODUCT.ALREADY_EXISTS);

    const product = new ProductModel({
      ...productDto,
      tenant: user.tenant.id,
      category: productDto.categoryId,
      tag: productDto.tagId,
    });

    await product.save();

    return product;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const updateProduct = async (productDto: ProductDTO, user: UserSchema) => {
  try {
    const [categoryFound, tagFound] = await checkIfCategoryAndTagExists(
      productDto.categoryId,
      productDto.tagId,
      user.tenant.id
    );

    if (!categoryFound) throw CustomError.badRequest(ERRORS.CATEGORY.NOT_FOUND);
    if (!tagFound) throw CustomError.badRequest(ERRORS.TAG.NOT_FOUND);

    const productUpdated = await ProductModel.findByIdAndUpdate(
      productDto.id,
      {
        ...productDto,
      },
      {
        new: true,
      }
    ).where('tenant', user.tenant.id);

    if (!productUpdated) throw CustomError.badRequest(ERRORS.PRODUCT.NOT_FOUND);

    return productUpdated;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const deleteProduct = async (id: string, user: UserSchema) => {
  try {
    const productDeleted = await ProductModel.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        new: true,
      }
    ).where('tenant', user.tenant.id);

    if (!productDeleted) throw CustomError.badRequest(ERRORS.PRODUCT.NOT_FOUND);

    return productDeleted;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const checkIfCategoryAndTagExists = async (
  categoryId: string,
  tagId: string,
  tenantId: string
): Promise<[CategorySchema | null, TagSchema | null]> => {
  return Promise.all([
    CategoryModel.findById(categoryId, { available: true, tenant: tenantId }),
    TagModel.findById(tagId, { active: true, tenant: tenantId }),
  ]);
};

export const productService = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
