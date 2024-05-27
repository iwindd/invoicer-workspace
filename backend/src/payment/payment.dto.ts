export class CreatePaymentDto {
  readonly title: string;
  readonly name: string;
  readonly account: string;
  readonly active: boolean;
}

export class UpdatePaymentDto {
  readonly title: string;
  readonly name: string;
  readonly account: string;
}

export class PatchPaymentDto{
  readonly active: boolean;
}