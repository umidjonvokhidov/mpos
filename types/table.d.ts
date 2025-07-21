declare interface TransactionsTable {
  id: string;
  customer: string;
  type: string;
  total: number;
  status: 'Completed' | 'Pending' | 'Declined';
}