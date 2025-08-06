declare interface CartProduct {
  productId: Product;
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
