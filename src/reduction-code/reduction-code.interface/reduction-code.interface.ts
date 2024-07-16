export interface ReductionCodeInterface {
  _id?: string;
  code: string;
  discountPercentage: number;
  expirationDate?: Date;
  isActive?: boolean;
}
