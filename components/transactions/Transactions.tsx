'use client';

import { useAuth, useTransaction } from '@/stores';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useEffect } from 'react';

const Transactions = () => {
  const { transactions, fetchUserTransactions, isTransactionLoading } = useTransaction();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchUserTransactions(user);
      }
    };

    fetchData();
  }, []);
  return transactions && <DataTable columns={columns} data={transactions} loading={isTransactionLoading} />;
};

export default Transactions;
