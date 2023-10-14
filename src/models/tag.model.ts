import { ZodError, z } from 'zod';
import { handleZodError } from '../utils/errors';

export class TagDTO {
  private constructor(public name: string, public active: boolean, public description?: string, public id?: string) {}

  static create(object: { [key: string]: any }): [string[]?, TagDTO?] {
    const { name, description } = object;

    try {
      z.object({
        name: z.string({ required_error: 'El campo nombre es requerido' }),
      }).parse(object);
      return [undefined, new TagDTO(name, true, description)];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static update(object: { [key: string]: any }): [string[]?, TagDTO?] {
    const { name, description, active, id } = object;

    try {
      z.object({
        id: z.string({ required_error: 'El campo id es requerido' }),
        name: z.string({ required_error: 'El campo nombre es requerido' }),
        active: z.boolean({ required_error: 'El campo activo es requerido' }),
      }).parse(object);
      return [undefined, new TagDTO(name, active, description, id)];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static delete(id: string, object: { [key: string]: any }): [string[]?, TagDTO?] {
    const { name, description, active } = object;

    try {
      z.object({
        id: z.string({ required_error: 'El campo id es requerido' }),
        active: z.boolean({ required_error: 'El campo activo es requerido' }),
      }).parse({ id, ...object });
      return [undefined, new TagDTO(name, active, description, id)];
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
