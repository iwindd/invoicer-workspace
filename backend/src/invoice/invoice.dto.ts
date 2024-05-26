export class CreateInvoiceDto {
  readonly items: string;
  readonly note: string;
  readonly start: Date;
  readonly end: Date;
  readonly ownerId: number;
}

