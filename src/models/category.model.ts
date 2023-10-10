import { ZodError, z } from "zod";
import { handleZodError } from "../utils/errors";

export class CategoryDTO {
  private constructor(
    public name: string,
    public available: boolean,
    public description?: string,
    public logo?: string,
    public id?: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string[] | undefined, CategoryDTO] {
    const { name, description, logo, available, id } = object;

    return [undefined, new CategoryDTO(name, available, description, logo, id)];
  }

  static update(object: {
    [key: string]: any;
  }): [string[] | undefined, CategoryDTO | undefined] {
    const { name, description, logo, available, id } = object;

    try {
      z.object({
        id: z.string({ required_error: "Id field is required" }),
        name: z.string({ required_error: "Name field is required" }),
        available: z.boolean({ required_error: "Available field is required" }),
      }).parse(object);
      return [
        undefined,
        new CategoryDTO(name, available, description, logo, id),
      ];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static delete(
    id: string,
    object: { [key: string]: any }
  ): [string[] | undefined, CategoryDTO | undefined] {
    const { name, description, logo, available } = object;

    try {
      z.object({
        id: z.string({ required_error: "Id field is required" }),
        available: z.boolean({ required_error: "Available field is required" }),
      }).parse({ id, ...object });
      return [
        undefined,
        new CategoryDTO(name, available, description, logo, id),
      ];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }

  static getId(id: string): [string[] | undefined, string | undefined] {
    try {
      z.object({
        id: z.string({ required_error: "Id field is required" }),
      }).parse({ id });
      return [undefined, id];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }
}
