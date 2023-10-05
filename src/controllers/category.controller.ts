import { Request, Response } from 'express';
import { addCategory, listCategories } from '../services';
import { handleError } from '../utils/errors';
import { CategoryDTO } from '../models';

export const getCategories = async (request: Request, response: Response) => {
  // const [errors, registerDto] = RegisterDTO.create(request.body);

  // if (errors) {
  //   return response.status(400).json({ errors });
  // }

  try {
    const tenantId = request.body.user.tenant.id;
    const data = await listCategories(tenantId);
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

  // console.log(request.body.user);

  try {
    const data = await addCategory(categoryDto, request.body.user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};
