export interface Order {
  id?: string;
  products: [
    {
      productId: string;
      quantity: number;
      price: number;
    },
  ];
  totalAmount: number;
  orderDate: Date;
  userId?: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
