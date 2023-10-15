import { ZodError, z } from 'zod';
import { handleZodError } from '../utils/errors';

export class ProductDTO {
  private constructor(
    public name: string,
    public sku: string,
    public price: number,
    public discountedPrice: number,
    public active: boolean,
    public inStock: boolean,
    public stock: number,
    public categoryId: string,
    public tagId: string,
    public status: 'PUBLISHED' | 'DRAFT' | 'INACTIVE',
    public description?: string,
    public id?: string
  ) {}

  static create(object: { [key: string]: any }): [string[]?, ProductDTO?] {
    const { name, sku, price, discountedPrice, inStock, stock, categoryId, tagId, descriprion } = object;

    try {
      z.object({
        name: z.string({ required_error: 'El campo name es requerido' }),
        price: z.number({ required_error: 'El campo price es requerido' }),
        inStock: z.boolean({ required_error: 'El campo inStock es requerido' }),
        stock: z.number({ required_error: 'El campo stock es requerido' }),
        categoryId: z.string({ required_error: 'El campo categoryId es requerido' }),
        tagId: z.string({ required_error: 'El campo tagId es requerido' }),
      }).parse(object);
      return [
        undefined,
        new ProductDTO(
          name,
          sku,
          price,
          discountedPrice,
          true,
          inStock,
          stock,
          categoryId,
          tagId,
          'PUBLISHED',
          descriprion
        ),
      ];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static update(object: { [key: string]: any }): [string[]?, ProductDTO?] {
    const { name, sku, price, active, discountedPrice, inStock, stock, categoryId, tagId, status, descriprion, id } =
      object;

    try {
      z.object({
        id: z.string({ required_error: 'El campo id es requerido' }),
      }).parse(object);
      return [
        undefined,
        new ProductDTO(
          name,
          sku,
          price,
          discountedPrice,
          active,
          inStock,
          stock,
          categoryId,
          tagId,
          status,
          descriprion,
          id
        ),
      ];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static getId(id: string): [string[]?, string?] {
    try {
      z.object({
        id: z.string({ required_error: 'El campo id es requerido' }),
      }).parse({ id });
      return [undefined, id];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }
}
