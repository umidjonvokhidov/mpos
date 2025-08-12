'use client';

import { useAuth, useTransaction } from '@/stores';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useEffect } from 'react';
import { table } from 'console';

const RecentTransactions = () => {
  const { transactions, fetchUserTransactions } = useTransaction();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        await fetchUserTransactions(user);
      }
    };

    fetchData();
  }, []);
  return transactions && <DataTable columns={columns} data={transactions} />;
};

export default RecentTransactions;
