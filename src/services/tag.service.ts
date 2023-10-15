import { CustomError, ERRORS, handleErrorInstances } from '../utils/errors';
import { PaginationDto, TagDTO } from '../models';
import { TagModel, TagSchema, UserSchema } from '../data';
import { PaginateResult } from 'mongoose';

const getTags = async (pagination: PaginationDto, user: UserSchema): Promise<PaginateResult<TagSchema>> => {
  try {
    const options = {
      page: pagination.page,
      limit: pagination.limit,
    };

    const tags = await TagModel.paginate({ tenant: user.tenant.id, active: true }, options);

    return tags;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const getTag = async (tagId: string, user: UserSchema): Promise<TagSchema> => {
  try {
    const tagFound = await TagModel.findById(tagId).where('tenant', user.tenant.id);

    if (!tagFound) throw CustomError.badRequest(ERRORS.TAG.NOT_FOUND);

    return tagFound;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const createTag = async (tagDto: TagDTO, user: UserSchema): Promise<TagSchema> => {
  try {
    const tagFound = await TagModel.findOne({
      name: tagDto.name,
      tenant: user.tenant.id,
    });

    if (tagFound) throw CustomError.badRequest(ERRORS.TAG.ALREADY_EXISTS);

    const tag = new TagModel({
      ...tagDto,
      tenant: user.tenant.id,
    });

    await tag.save();

    return tag;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const updateTag = async (category: TagDTO, user: UserSchema) => {
  try {
    const tagUpdated = await TagModel.findByIdAndUpdate(
      category.id,
      {
        name: category.name,
        description: category.description,
      },
      {
        new: true,
      }
    ).where('tenant', user.tenant.id);

    if (!tagUpdated) throw CustomError.badRequest(ERRORS.TAG.NOT_FOUND);

    return tagUpdated;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

const deleteTag = async (tag: TagDTO, user: UserSchema) => {
  try {
    const tagDeleted = await TagModel.findByIdAndUpdate(
      tag.id,
      {
        active: tag.active,
      },
      {
        new: true,
      }
    ).where('tenant', user.tenant.id);

    if (!tagDeleted) throw CustomError.badRequest(ERRORS.TAG.NOT_FOUND);

    return tagDeleted;
  } catch (error) {
    throw handleErrorInstances(error);
  }
};

export const tagService = {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
};
