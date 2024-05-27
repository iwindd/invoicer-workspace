export class CreatePaymentDto {
  readonly title: string;
  readonly name: string;
  readonly account: string;
  readonly active: boolean;
}

export class PatchPaymentDto{
  readonly active: boolean;
}