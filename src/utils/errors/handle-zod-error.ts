import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  return error.errors.map((error) => error.message);
};
