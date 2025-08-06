declare type ProductCategory = 'Drink' | 'Food' | 'Dessert' | 'Stick' | 'Other';

declare interface Product {
  _id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  stock: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
