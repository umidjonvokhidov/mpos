import type { Types } from "mongoose";

export type ProductCategory = "Drink" | "Food" | "Dessert" | "Stick" | "Other";

export interface Product {
  _id?: Types.ObjectId | string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  ingredients: string[];
  stock: number;
  createdBy: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
