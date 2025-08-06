'use client';
import Cart from '@/components/Cart';
import ProductsContainer from '@/components/ProductsContainer';
import { useAuth } from '@/stores';
import { twMerge } from 'tailwind-merge';

const Products = () => {
  const { user } = useAuth();
  const orderSuccess = new URLSearchParams(window.location.search).get('success');

  if (orderSuccess) {
    console.log('Order was successful');
  }

  return (
    <section
      className={twMerge(
        'grid grid-cols-1 max-w-[1536px] mx-auto w-full grid-rows-1 h-full overflow-hidden',
        user && user.role === 'waiter' ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-1',
      )}
    >
      <ProductsContainer />
      {user && user.role === 'waiter' && <Cart />}
    </section>
  );
};

export default Products;
