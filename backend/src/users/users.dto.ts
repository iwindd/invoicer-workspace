export class CreateUserDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly permission: string;
}

export class PatchUserDto{
  readonly password: string;
}
