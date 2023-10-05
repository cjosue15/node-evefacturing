export class CategoryDTO {
  private constructor(
    public name: string,
    public available: boolean,
    public description?: string,
    public logo?: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string | undefined, CategoryDTO] {
    const { name, description, logo } = object;

    // validate here with zod

    return [undefined, new CategoryDTO(name, true, description, logo)];
  }
}
