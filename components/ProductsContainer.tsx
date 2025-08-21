'use client';

import { useAuth, useProduct } from '@/stores';
import { Input } from './ui/input';
import Image from 'next/image';
import icons from '@/public/icons';
import { Button } from './ui/button';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/ProductDialog';
import ProductDialogForm from './ProductDialogForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Lottie from 'lottie-react';
import TrailLoading from '@/public/lotties/TrailLoading.json';


export enum Categories {
  All = 'All',
  Drink = 'Drink',
  Food = 'Food',
  Dessert = 'Dessert',
  Stick = 'Stick',
}

const ProductsContainer = () => {
  const { products, createProduct, isProductLoading } = useProduct();
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const { image, stock, category, name, price } = values;
      const productCreated = await createProduct({ name, price, category, image, stock });
      if (productCreated) setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-base-white relative p-2.5 flex flex-col gap-y-1.5 w-full flex-1 h-full rounded-b-[6px]">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className="absolute top-0 -right-[15px] lg:block hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 0C3 0 0 10 0 15V0H15Z" fill="#fff" />
      </svg>
      <div className="flex flex-col gap-y-2.5">
        <div className="relative">
          <Input
            placeholder="Search order product..."
            onChange={(e) => setSearch(e.target.value)}
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
          <div className="items-center gap-x-1 hidden md:flex">
            {Object.values(Categories).map((category) => (
              <div
                className={twMerge(
                  'px-8 py-1.5 rounded-[6px] border border-grey-100 cursor-pointer',
                  (filter === category || (filter === '' && category === 'All')) &&
                    'border-blue-500 text-blue-500',
                )}
                key={category}
                onClick={() => setFilter(category === 'All' ? '' : category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="block md:hidden">
            <Select
              onValueChange={(value) => setFilter(value === 'All' ? '' : value)}
              defaultValue={'All'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Categories).map((category) => (
                  <SelectItem value={category} key={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {user && user.role !== 'waiter' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="flex items-center gap-x-1.5 cursor-pointer">
                <Image src={icons.plus} alt="plus" width={20} height={20} />
                <span>Add Product</span>
              </DialogTrigger>
              <DialogContent className="p-2.5">
                <DialogHeader>
                  <DialogTitle>Add Product</DialogTitle>
                  <DialogDescription>
                    Fill in the product details below to add a new product to your inventory.
                  </DialogDescription>
                  <ProductDialogForm handleSubmit={handleSubmit} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <ScrollArea className="w-full h-full overflow-hidden pr-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isProductLoading ? <Lottie className="w-20 h-20 mx-auto" animationData={TrailLoading} loop={true} /> : products && products.length > 0 ? (
            products
              .filter((p) => (filter !== '' ? p.category === filter : true))
              .filter((p) =>
                search !== ''
                  ? p.name
                      .replace(/[\t ]{2,}/g, ' ')
                      .toLowerCase()
                      .includes(
                        search
                          .replace(/[\t ]{2,}/g, ' ')
                          .trim()
                          .toLowerCase(),
                      )
                  : true,
              )
              .map((product: Product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <span>Products not found!</span>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductsContainer;
