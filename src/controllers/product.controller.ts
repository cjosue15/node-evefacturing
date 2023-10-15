import { Request, Response } from 'express';
import { authService, productService } from '../services';
import { handleError } from '../utils/errors';
import { PaginationDto, ProductDTO } from '../models';

const getProducts = async (request: Request, response: Response) => {
  const { page, limit } = request.query;
  const [errors, paginationDto] = PaginationDto.create(Number(page ?? 1), Number(limit ?? 10));

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await productService.getProducts(paginationDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const getProduct = async (request: Request, response: Response) => {
  const [errors, id] = ProductDTO.getId(request.params.id);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await productService.getProduct(id!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const addProduct = async (request: Request, response: Response) => {
  const [errors, productDto] = ProductDTO.create(request.body);

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await productService.addProduct(productDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const updateProduct = async (request: Request, response: Response) => {
  const id = request.params.id;
  const [errors, productDto] = ProductDTO.update({ ...request.body, id });

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await productService.updateProduct(productDto!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

const deleteProduct = async (request: Request, response: Response) => {
  const id = request.params.id;
  const [errors, productId] = ProductDTO.getId({ ...request.body, id });

  if (errors) {
    return response.status(400).json(errors);
  }

  try {
    const user = authService.getCurrentUser(request);
    const data = await productService.deleteProduct(productId!, user);
    return response.json(data);
  } catch (error) {
    return handleError(error, response);
  }
};

export const productController = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
