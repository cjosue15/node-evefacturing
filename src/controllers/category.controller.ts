import { Request, Response } from "express";
import { categoryService } from "../services";
import { handleError } from "../utils/errors";
import { CategoryDTO } from "../models";

export const getCategories = async (request: Request, response: Response) => {
  // const [errors, registerDto] = RegisterDTO.create(request.body);

  // if (errors) {
  //   return response.status(400).json({ errors });
  // }

  try {
    const tenantId = request.body.user.tenant.id;
    const data = await categoryService.listCategories(tenantId);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const getCategory = async (request: Request, response: Response) => {
  const [errors, id] = CategoryDTO.getId(request.params.id);

  if (errors) {
    return response.status(400).json({ errors });
  }

  try {
    const data = await categoryService.getCategory(id!);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const createCategory = async (request: Request, response: Response) => {
  const [errors, categoryDto] = CategoryDTO.create(request.body);

  if (errors) {
    return response.status(400).json({ errors });
  }

  try {
    const data = await categoryService.addCategory(
      categoryDto,
      request.body.user
    );
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const updateCategory = async (request: Request, response: Response) => {
  const id = request.params.id;
  const [errors, categoryDto] = CategoryDTO.update({ ...request.body, id });

  if (errors) {
    return response.status(400).json({ errors });
  }
  try {
    const data = await categoryService.putCategory(categoryDto!);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const deleteCategory = async (request: Request, response: Response) => {
  const categoryId = request.params.id;
  const [errors, categoryDto] = CategoryDTO.delete(categoryId, request.body);

  if (errors) {
    return response.status(400).json({ errors });
  }

  try {
    const data = await categoryService.removeCategory(categoryDto!);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};
