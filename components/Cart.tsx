import { Button } from './ui/button';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from './ui/select';
import Image from 'next/image';
import icons from '@/public/icons';
import { useCart } from '@/stores';
import { ScrollArea } from './ui/scroll-area';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import TrailLoading from '@/public/lotties/TrailLoading.json';

const formSchema = z.object({
  typeService: z.enum(['Delivery', 'Take Away', 'Dine In']),
  fullname: z.string().min(2, 'Full name is too short').max(50),
  tableNumber: z.number().min(1),
  description: z.string().optional(),
});

const Cart = () => {
  const {
    cart,
    deleteFromCart,
    cartProperties,
    checkoutCart,
    confirmCartProperties,
    setCartProperties,
    isCartLoading,
  } = useCart();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeService: 'Dine In',
      fullname: '',
      tableNumber: 1,
      description: '',
    },
  });

  useEffect(() => {
    setCartProperties();
    if (cartProperties) {
      form.reset({
        typeService: cartProperties?.typeService || 'Dine In',
        fullname: cartProperties?.fullname || '',
        tableNumber: cartProperties?.tableNumber || 0,
        description: cartProperties?.description || '',
      });
    }
  }, [editMode]);

  const removeProductFromCartCompletely = async (id: string) => {
    try {
      const success = await deleteFromCart(id);
      if (success) {
        console.log('Product removed from cart successfully');
      } else {
        console.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.log('Error removing product from cart:', error);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      confirmCartProperties(values as CartProperties);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    setIsLoading(true);
    try {
      const res = await checkoutCart();

      if (res) {
        router.push(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col row-start-1 lg:row-auto overflow-y-hidden justify-between h-auto rounded-t-[10px] lg:rounded-[10px] bg-base-white lg:ml-2.5 lg:mt-2.5 p-2.5">
      <div className="flex flex-col gap-y-5 h-full overflow-y-hidden">
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-base text-base-black font-medium">Order Details</h4>
            <p className="text-sm font-normal text-base-black">See Order</p>
          </div>
          {!editMode && cartProperties ? (
            <div className="flex flex-col w-full gap-y-3">
              <div className="flex flex-col gap-y-3">
                {Object.entries(cartProperties).map(([key, value]) => (
                  <div className="flex flex-col gap-y-1" key={key}>
                    <h4 className="text-sm text-grey-600">{key}</h4>
                    <h3 className="text-base text-base-black">
                      {key !== 'description' ? value : value === '' ? 'No description' : value}
                    </h3>
                  </div>
                ))}
              </div>
              <Button
                className="w-full cursor-pointer"
                onClick={() => {
                  (setEditMode(true), console.log(editMode));
                }}
              >
                Edit
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <div className="p-1 bg-grey-100 rounded-[8px]">
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5">
                  <FormField
                    control={form.control}
                    name="typeService"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full bg-base-white border-none h-9 text-sm font-normal placeholder:text-grey-600">
                              <SelectValue placeholder="Choose service type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dine In">Dine In</SelectItem>
                              <SelectItem value="Delivery">Delivery</SelectItem>
                              <SelectItem value="Take Away">Take Away</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full name"
                            className="bg-base-white border-none h-9 text-sm font-normal placeholder:text-grey-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tableNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Table no."
                            type="number"
                            className="bg-base-white border-none h-9 text-sm font-normal placeholder:text-grey-600"
                            {...field}
                            onChange={(e) => {
                              const numericValue =
                                e.target.value === '' ? undefined : Number(e.target.value);
                              field.onChange(numericValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Description..."
                            className="bg-base-white border-none h-9 text-sm font-normal placeholder:text-grey-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="h-9 text-[12px] text-base-white font-normal cursor-pointer">
                    Confirmation
                  </Button>
                </form>
              </div>
            </Form>
          )}
        </div>
        <hr className="border border-grey-100" />
        <ScrollArea className="h-full overflow-hidden mb-8 pr-4">
          {isCartLoading && (
            <Lottie className="w-20 h-20 mx-auto" animationData={TrailLoading} loop={true} />
          )}
          <div className="flex flex-col gap-y-3">
            {cart?.products.length! > 0 ? (
              cart?.products.map(({ count, productId }: CartProduct) => {
                const { image, name, price, _id }: Product = productId;
                return (
                  <div className="flex items-center justify-between gap-x-2" key={_id}>
                    <div className="flex items-center gap-x-2.5">
                      <Image
                        src={image}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover w-[72px] h-[56px] rounded-[8px]"
                      />
                      <div className="flex flex-col items-start gap-y-2">
                        <h5 className="text-sm font-medium text-base-black">{name}</h5>
                        <div className="flex items-center gap-x-2">
                          <h5 className="text-sm font-normal text-grey-600">{count}X</h5>
                          <h5 className="text-sm font-medium text-base-black">${price}</h5>
                        </div>
                      </div>
                    </div>
                    <Image
                      src={icons.defaultIcon}
                      width={20}
                      height={20}
                      alt="trash"
                      className="cursor-pointer"
                      onClick={() => removeProductFromCartCompletely(_id)}
                    />
                  </div>
                );
              })
            ) : (
              <p>No products in cart</p>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gpa-y-2.5">
            <div className="flex justify-between items-center">
              <h5 className="text-[12px] text-grey-800 font-medium">Sub Total</h5>
              <p className="text-sm font-medium text-base-black">${cart?.totalPrice?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-[12px] text-grey-800 font-medium">Tax/10%</h5>
              <p className="text-sm font-medium text-base-black">
                ${(cart?.totalPrice! * 0.1).toFixed(2)}
              </p>
            </div>
          </div>
          <hr className="border border-grey-100" />
          <div className="flex items-center justify-between">
            <h5 className="text-sm text-base-black font-medium">Total</h5>
            <p className="text-sm text-base-black font-medium">
              ${(cart?.totalPrice! * 1.1).toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          className="cursor-pointer"
          disabled={!cartProperties || isLoading}
          onClick={() => checkout()}
        >
          {!isLoading ? `Pay ${(cart?.totalPrice! * 1.1).toFixed(2)}` : 'Loading...'}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
