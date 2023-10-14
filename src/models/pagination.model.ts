import { ZodError, z } from 'zod';
import { handleZodError } from '../utils/errors';

export class PaginationDto {
  private constructor(public readonly page: number, public readonly limit: number) {}

  static create(page: number = 1, limit: number = 10): [string[]?, PaginationDto?] {
    console.log({ page, limit });
    try {
      z.object({
        page: z.number().min(1, { message: 'La pagina debe ser mayor a 0' }),
        limit: z.number().min(1, { message: 'El limite debe ser mayor a 0' }),
      }).parse({ page, limit });
      return [undefined, new PaginationDto(page, limit)];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }
}
