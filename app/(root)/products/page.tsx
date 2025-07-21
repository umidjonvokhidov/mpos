'use client';
import Cart from '@/components/Cart';
import ProductsContainer from '@/components/ProductsContainer';

const Products = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] max-w-[1536px] mx-auto w-full grid-rows-1 h-full overflow-hidden">
      <ProductsContainer />
      <Cart />
    </section>
  );
};

export default Products;
