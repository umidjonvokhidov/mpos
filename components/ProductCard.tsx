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
import { useAuth, useCart, useProduct } from '@/stores';
import ProductDialogForm from './ProductDialogForm';

const ProductCard = ({ product }: { product: Product }) => {
  const { image, name, price, stock, category } = product;
  const [open, setOpen] = useState(false);
  const { updateProduct } = useProduct();
  const { user } = useAuth();
  const { addToCart, cart, removeFromCart } = useCart();

  const handleSubmit = async (values: ProductFormValues) => {
    console.log(values);
    try {
      const { image, stock, category, name, price } = values;

      if (!product._id) {
        throw new Error('Product ID is missing');
      }
      const productUpdate = await updateProduct(product._id, {
        image,
        stock,
        category,
        name,
        price,
      });
      console.log(productUpdate);

      if (productUpdate) setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (id: string) => {
    try {
      const success = await addToCart(id);
      if (success) {
        console.log('Product added to cart successfully');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeProductFromCart = async (id: string) => {
    try {
      const success = await removeFromCart(id);
      if (success) {
        console.log('Product removed from cart successfully');
      } else {
        console.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.log('Error removing product from cart:', error);
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

        {user?.role === 'waiter' ? (
          <div className="p-1 rounded-[8px] bg-neutral-grey-100 flex items-center justify-between">
            <Button
              className="p-2 rounded-[8px] cursor-pointer"
              onClick={() => removeProductFromCart(product._id)}
            >
              <Image src={icons.min} alt="minus" width={20} height={20} />
            </Button>
            <span className="text-sm text-base-black font-medium">
              {cart?.products?.some(
                (item) => item.productId._id.toString() === product._id.toString(),
              )
                ? cart.products.find(
                    (item) => item.productId._id.toString() === product._id.toString(),
                  )?.count
                : 0}
            </span>
            <Button
              className="p-2 rounded-[8px] cursor-pointer"
              onClick={() => addProductToCart(product._id)}
            >
              <Image src={icons.plusWhite} alt="minus" width={20} height={20} />
            </Button>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-x-1.5 cursor-pointer">
              <span className="p-2 text-base-white bg-base-black w-full rounded-[8px] cursor-pointer">
                Update Product
              </span>
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
