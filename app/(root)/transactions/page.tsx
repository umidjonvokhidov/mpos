"use client"

const Transactions = () => {
  const orderCancel = new URLSearchParams(window.location.search).get('canceled');

  if (orderCancel) {
    console.log('Order was canceled');
  }

  return <div className="text-purple-500 font-bold text-5xl">Transactions</div>;
};

export default Transactions;
