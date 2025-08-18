'use client';
import Cart from '@/components/Cart';
import ProductsContainer from '@/components/ProductsContainer';
import { useAuth, useTransaction } from '@/stores';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/TransactionSuccessDialog';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { formatDateWithTime } from '@/lib/dateUtils';
import { Button } from '@/components/ui/button';

const Products = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [orderDetails, setOrderDetails] = useState<Record<string, string> | null>(null);
  const { getTransaction } = useTransaction();
  const router = useRouter();

  useEffect(() => {
    fetch('/lotties/SuccessCheck.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const transactionId = new URLSearchParams(window.location.search).get('transactionId');

  useEffect(() => {
    const getTransactionData = async () => {
      if (transactionId) {
        const transaction = await getTransaction(transactionId);
        const transactionDate = transaction?.createdAt && new Date(transaction.createdAt);

        const details = {
          'Transaction ID': transaction._id || '',
          Date: formatDateWithTime(transactionDate!),
          'Type Services': transaction?.typeService,
          Total: (transaction?.totalPrice && `$${transaction.totalPrice.toFixed(2)}`) || '',
          'Payment Status': transaction?.paymentStatus,
        };

        setOrderDetails(details);
        setOpen(true);
        router.replace('/products');
      }
    };

    getTransactionData();
  }, [transactionId, getTransaction, router]);

  return (
    <section
      className={twMerge(
        'grid grid-cols-1 max-w-[1536px] mx-auto w-full grid-rows-1 p-2.5 lg:p-0 h-screen overflow-hidden',
        user && user.role === 'waiter' ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-1',
      )}
    >
      <ProductsContainer />
      {user && user.role === 'waiter' && <Cart />}
      {open && (
        <Dialog open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center">
                <Lottie
                  animationData={animationData}
                  loop={false}
                  autoPlay={true}
                  color="#0EBE1F"
                  style={{ width: 100, height: 100 }}
                />
                <span className="text-center text-4xl font-satoshi font-normal">
                  Your Order Has Success!
                </span>
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                Wait for us to Cook and serve it derecly to you
              </DialogDescription>
              <div className="flex flex-col gap-y-10">
                <div className="mt-6 flex flex-col items-start gap-y-2.5">
                  <h4 className="text-base font-medium">Detail Transaction</h4>
                  <div className="flex flex-col gap-y-4 w-full">
                    {orderDetails &&
                      Object.entries(orderDetails).map(([key, value]) => (
                        <div className="flex justify-between items-center w-full" key={key}>
                          <h5 className="font-satoshi text-base text-grey-600">{key}</h5>
                          <p
                            className={twMerge(
                              'font-satoshi',
                              key === 'Payment Status'
                                ? 'py-1 px-2.5 rounded-full text-success-600 bg-success-50 capitalize text-sm'
                                : 'text-base-black text-base',
                            )}
                          >
                            {String(value)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 items-center">
                  <Button
                    className="h-9 border border-base-black hover:bg-base-white cursor-pointer rounded-[6px] bg-base-white hover:opacity-50 text-base-black"
                    onClick={() => setOpen(false)}
                  >
                    Receive
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    className="h-9 border-base-black border cursor-pointer rounded-[6px] bg-base-black text-base-white"
                  >
                    Okay
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Products;
