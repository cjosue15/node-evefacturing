import { Request, Response } from 'express';
import { authService, categoryService } from '../services';
import { handleError } from '../utils/errors';
import { CategoryDTO, PaginationDto } from '../models';

export const getCategories = async (request: Request, response: Response) => {
  const { page, limit } = request.query;
  const [errors, paginationDto] = PaginationDto.create(Number(page ?? 1), Number(limit ?? 10));

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await categoryService.listCategories(paginationDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const getCategory = async (request: Request, response: Response) => {
  const [errors, id] = CategoryDTO.getId(request.params.id);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await categoryService.getCategory(id!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const createCategory = async (request: Request, response: Response) => {
  const [errors, categoryDto] = CategoryDTO.create(request.body);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await categoryService.addCategory(categoryDto, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const updateCategory = async (request: Request, response: Response) => {
  const id = request.params.id;
  const [errors, categoryDto] = CategoryDTO.update({ ...request.body, id });

  if (errors) {
    return response.status(400).json(errors);
  }
  try {
    const user = authService.getCurrentUser(request);
    const data = await categoryService.putCategory(categoryDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const deleteCategory = async (request: Request, response: Response) => {
  const categoryId = request.params.id;
  const [errors, categoryDto] = CategoryDTO.delete(categoryId, request.body);

  // TODO: Implement soft delte by category, if the category has products.
  // We need to validate with error if first need to delete the product or change of category

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await categoryService.removeCategory(categoryDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};
