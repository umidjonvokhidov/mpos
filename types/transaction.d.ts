import type { Types } from "mongoose";

export type TransactionProduct = {
  productId: string;
  count: number;
  price: number;
};

export type PaymentDetails = {
  PaymentId?: string;
  receiptUrl?: string;
  gatewayResponse?: any;
};

export type TransactionStatus = "pending" | "completed" | "declined";
export type PaymentStatus = "pending" | "completed" | "failed";
export type TypeService = "Delivery" | "Take Away" | "Dine In";
export type PaymentMethod = "Credit Card" | "PayPal" | "Cash" | "Apple Pay" | "Google Pay";

export interface Transaction {
  _id?: string;
  userID: string;
  fullname: string;
  typeService: TypeService;
  totalPrice: number;
  status: TransactionStatus;
  products: TransactionProduct[];
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetails?: PaymentDetails;
  createdAt?: Date;
  updatedAt?: Date;
}
