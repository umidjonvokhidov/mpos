'use client';

import { useAuth, useTransaction } from '@/stores';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useEffect } from 'react';

const RecentTransactions = () => {
  const { transactions, fetchUserTransactions } = useTransaction();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        await fetchUserTransactions(user._id);
      }
    };

    fetchData();
  }, []);
  return (
    transactions && (
      <DataTable
        columns={columns}
        columnsVisibility={{
          paymentMethod: false,
          createdAt: false,
          updatedAt: false,
        }}
        data={transactions}
      />
    )
  );
};

export default RecentTransactions;
