import { Request, Response } from 'express';
import { authService, tagService } from '../services';
import { handleError } from '../utils/errors';
import { PaginationDto, TagDTO } from '../models';

const getTags = async (request: Request, response: Response) => {
  const { page, limit } = request.query;
  const [errors, paginationDto] = PaginationDto.create(Number(page ?? 1), Number(limit ?? 10));

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await tagService.getTags(paginationDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const getTag = async (request: Request, response: Response) => {
  const [errors, id] = TagDTO.getId(request.params.id);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await tagService.getTag(id!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const createTag = async (request: Request, response: Response) => {
  const [errors, tagDto] = TagDTO.create(request.body);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await tagService.createTag(tagDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const updateTag = async (request: Request, response: Response) => {
  const id = request.params.id;
  const [errors, tagDto] = TagDTO.update({ ...request.body, id });

  if (errors) {
    return response.status(400).json(errors);
  }
  try {
    const user = authService.getCurrentUser(request);
    const data = await tagService.updateTag(tagDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const deleteTag = async (request: Request, response: Response) => {
  const categoryId = request.params.id;
  const [errors, tagDto] = TagDTO.delete(categoryId, request.body);

  // TODO: Implement soft delte by category, if the category has products.
  // We need to validate with error if first need to delete the product or change of category

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await tagService.deleteTag(tagDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const tagController = {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
};
