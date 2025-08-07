'use client';

import { twMerge } from 'tailwind-merge';

const Transactions = () => {
  const orderCancel = new URLSearchParams(window.location.search).get('canceled');

  if (orderCancel) {
    console.log('Order was canceled');
  }

  return (
    <section className={twMerge(' max-w-[1536px] mx-auto w-full p-2.5 h-full overflow-hidden')}>
      <div className="flex flex-col gap-y-3"></div>
    </section>
  );
};

export default Transactions;
