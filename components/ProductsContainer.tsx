'use client';

import { useProduct } from '@/stores';
import { Input } from './ui/input';
import Image from 'next/image';
import icons from '@/public/icons';
import { Button } from './ui/button';
import ProductCard from './ProductCard';

const categories: Category[] = [
  { key: 'all', value: 'All' },
  { key: 'drinks', value: 'Drinks' },
  { key: 'food', value: 'Food' },
];

interface Category {
  key: string;
  value: string;
}

const ProductsContainer = () => {
  const { products } = useProduct();
  return (
    <div className="bg-base-white p-2.5 flex flex-col gap-y-1.5 w-full flex-1 h-full rounded-b-[6px] relative">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className="absolute top-0 -right-[15px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 0C3 0 0 10 0 15V0H15Z" fill="#fff" />
      </svg>
      <div className="flex flex-col gap-y-2.5">
        <div className="relative">
          <Input
            placeholder="Search order product..."
            className="py-3 pl-9 placeholder:text-sm text-lg placeholder:text-grey-600  pr-24 h-[45px]"
          />
          <Image
            src={icons.search1}
            alt="search"
            width={20}
            height={20}
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <Button className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer">
            Search
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            {categories.map(({ key, value }: Category) => (
              <div
                className="px-8 py-1.5 rounded-[6px] border border-grey-100 cursor-pointer"
                key={key}
              >
                {value}
              </div>
            ))}
          </div>
          <button className="flex items-center gap-x-1.5 cursor-pointer">
            <Image src={icons.plus} alt="plus" width={20} height={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full flex-1 overflow-y-auto">
        {products && products.length > 0 ? (
          products.map((product: Product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <span>Products not found!</span>
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;
