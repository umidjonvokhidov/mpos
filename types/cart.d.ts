declare interface CartProduct {
  productId: string | Product;
  count: number;
}

declare interface Cart {
  _id: string;
  user: string | User;
  products: CartProduct[];
  totalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
