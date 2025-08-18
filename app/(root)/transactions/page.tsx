'use client';

import Transactions from '@/components/transactions/Transactions';
import { twMerge } from 'tailwind-merge';

const TransactionsPage = () => {
  const orderCancel = new URLSearchParams(window.location.search).get('canceled');

  if (orderCancel) {
    console.log('Order was canceled');
  }

  return (
    <section className={twMerge(' max-w-[1536px] mx-auto w-full p-2.5 h-screen rounded-b-[10px] overflow-hidden bg-base-white')}>
      <Transactions />
    </section>
  );
};

export default TransactionsPage;
