export interface ReductionCodeInterface {
  _id?: string;
  code: string;
  discountPercentage: number;
  createdAt?: Date;
  expirationDate?: Date;
  isActive?: boolean;
}
