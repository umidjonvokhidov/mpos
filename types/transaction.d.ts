declare type TransactionProduct = {
  productId: string;
  count: number;
  price: number;
};

declare type PaymentDetails = {
  PaymentId?: string;
  receiptUrl?: string;
  gatewayResponse?: any;
};

declare type TransactionStatus = 'pending' | 'completed' | 'declined';
declare type PaymentStatus = 'pending' | 'completed' | 'failed';
declare type TypeService = 'Delivery' | 'Take Away' | 'Dine In';
declare type PaymentMethod = 'Credit Card' | 'PayPal' | 'Cash' | 'Apple Pay' | 'Google Pay';

declare interface Transaction {
  _id?: string;
  userID: string;
  fullname: string;
  typeService: TypeService;
  totalPrice: number;
  tableNumber: number;
  status: TransactionStatus;
  products: TransactionProduct[];
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetails?: PaymentDetails;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface CartProperties {
  fullname: string;
  typeService: TypeService;
  tableNumber: number;
  description?: string;
}
