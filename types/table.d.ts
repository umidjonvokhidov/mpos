declare interface TransactionsTable {
  id: string;
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
