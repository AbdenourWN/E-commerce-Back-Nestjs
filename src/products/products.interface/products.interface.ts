export interface product {
  id?: string;
  name: string;
  quantity: number;
  description?: string;
  category?: string;
  subcategory?: string;
  image?: string;
  promotion?: boolean;
  promotionAmount?: number;
  brand?: string;
}
