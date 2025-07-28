'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
import icons from '@/public/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useProduct } from '@/stores';
import ProductDialogForm from './ProductDialogForm';

const ProductCard = ({ product }: { product: Product }) => {
  const { image, name, price, stock, category } = product;
  const [open, setOpen] = useState(false);
  // const { createProduct } = useProduct();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const { image, stock, category, name, price } = values;
      // const productCreated = await createProduct({ name, price, category, image, stock });
      // if (productCreated) setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-2 gap-y-4">
      <Image
        src={image}
        alt={name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[109px] sm:h-[139px] md:h-[169px] lg:h-[193px] object-cover rounded-[6px] lg:rounded-[8px]"
      />
      <div className="flex flex-col gap-y-2.5">
        <div className="flex justify-between items-start flex-col md:flex-row md:items-center ">
          <h4 className="text-sm lg:text-base font-medium">{name}</h4>
          <h4 className="text-sm lg:text-base font-bold">${price.toFixed(2)}</h4>
        </div>
        <div className="p-1 rounded-[8px] bg-neutral-grey-100 flex items-center justify-between">
          <Button className="p-2 rounded-[8px] cursor-pointer">
            <Image src={icons.min} alt="minus" width={20} height={20} />
          </Button>
          <span className="text-sm text-base-black font-medium">
            0 <p>edit</p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="flex items-center gap-x-1.5 cursor-pointer">
                <Image src={icons.plus} alt="plus" width={20} height={20} />
                <span>Add Product</span>
              </DialogTrigger>
              <DialogContent className="p-2.5">
                <DialogHeader>
                  <DialogTitle>Update Product</DialogTitle>
                  <DialogDescription>
                    Update the product details below to modify this product in your inventory.
                  </DialogDescription>
                  <ProductDialogForm
                    handleSubmit={handleSubmit}
                    defaultValues={{ imageUrl: image, name, price, stock, category }}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </span>
          <Button className="p-2 rounded-[8px] cursor-pointer">
            <Image src={icons.plusWhite} alt="minus" width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
