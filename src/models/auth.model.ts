export class AccountDTO {
  email: string;
  domain: string;
  name: string;
  constructor(email: string, domain: string, name: string) {
    this.email = email;
    this.domain = domain;
    this.name = name;
  }
}

export class RegisterDTO {
  private constructor(
    public email: string,
    public password: string,
    public tenant: string,
    public name: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string | undefined, RegisterDTO] {
    const { email, name, password, tenant } = object;

    // validate here with zod

    return [undefined, new RegisterDTO(email, password, tenant, name)];
  }
}

export class LoginDTO {
  private constructor(public email: string, public password: string) {}

  static create(object: {
    [key: string]: any;
  }): [string | undefined, LoginDTO] {
    const { email, password } = object;

    // validate here with zod

    return [undefined, new LoginDTO(email, password)];
  }
}
