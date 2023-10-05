import { ZodError, z } from 'zod';
import { handleZodError } from '../utils/errors';

export class RegisterDTO {
  private constructor(public email: string, public password: string, public tenant: string, public name: string) {}

  static create(object: { [key: string]: any }): [string[] | undefined, RegisterDTO | undefined] {
    const { email, name, password, tenant } = object;

    try {
      z.object({
        email: z.string({ required_error: 'Email is required' }).email({
          message: 'Invalid email address',
        }),
        name: z.string({ required_error: 'Name is required' }).min(3).max(255),
        password: z
          .string({ required_error: 'Password is required' })
          .min(6, { message: 'Password must be at least 6 characters' })
          .max(255),
        tenant: z.string({ required_error: 'Tenant is required' }),
      }).parse(object);

      return [undefined, new RegisterDTO(email, password, tenant, name)];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }
}

export class LoginDTO {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string[] | undefined, LoginDTO | undefined] {
    const { email, password } = object;

    try {
      z.object({
        email: z.string({ required_error: 'Email is required' }).email({
          message: 'Invalid email address',
        }),
        password: z
          .string({ required_error: 'Password is required' })
          .min(6, { message: 'Password must be at least 6 characters' })
          .max(255),
      }).parse(object);

      return [undefined, new LoginDTO(email, password)];
    } catch (error) {
      const zodError = error as ZodError;
      return [handleZodError(zodError), undefined];
    }
  }
}
