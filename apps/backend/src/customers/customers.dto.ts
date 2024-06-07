export class CreateCustomerDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly joinedAt: Date;
}

export class UpdateCustomerDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly joinedAt: Date;
}

export class PatchCustomerDto{
  readonly lineToken: string
}