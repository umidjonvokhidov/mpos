import { Button } from './ui/button';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from './ui/select';
import Image from 'next/image';
import icons from '@/public/icons';

const formSchema = z.object({
  typeService: z.enum(['Delivery', 'Take Away', 'Dine In']),
  fullName: z.string().min(2, 'Full name is too short').max(50),
  tableNumber: z.number(),
  description: z.string().optional(),
});

const Cart = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeService: 'Dine In',
      fullName: '',
      tableNumber: undefined,
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col justify-between rounded-[10px] bg-base-white ml-2.5 mt-2.5 p-2.5">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-base text-base-black font-medium">Order Details</h4>
            <p className="text-sm font-normal text-base-black">See Order</p>
          </div>
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
                  name="fullName"
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
        </div>
        <hr className="border border-grey-100" />
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2.5">
              <Image
                src={
                  'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29mZmVlfGVufDB8fDB8fHww'
                }
                alt=""
                width={72}
                height={56}
                className="object-cover rounded-[8px]"
              />
              <div className="flex flex-col items-start gap-y-2">
                <h5 className="text-sm font-medium text-base-black">French Vanilla Fantasy</h5>
                <div className="flex items-center gap-x-2">
                  <h5 className="text-sm font-normal text-grey-600">1X</h5>
                  <h5 className="text-sm font-medium text-base-black">$15</h5>
                </div>
              </div>
            </div>
            <Image
              src={icons.defaultIcon}
              width={20}
              height={20}
              alt="trash"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gpa-y-2.5">
            <div className="flex justify-between items-center">
              <h5 className="text-[12px] text-grey-800 font-medium">Sub Total</h5>
              <p className="text-sm font-medium text-base-black">$33.00</p>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-[12px] text-grey-800 font-medium">Tax/10%</h5>
              <p className="text-sm font-medium text-base-black">$12.00</p>
            </div>
          </div>
          <hr className="border border-grey-100" />
          <div className="flex items-center justify-between">
            <h5 className="text-sm text-base-black font-medium">Total</h5>
            <p className="text-sm text-base-black font-medium">$45.00</p>
          </div>
        </div>
        <Button className="cursor-pointer">Pay $45.00</Button>
      </div>
    </div>
  );
};

export default Cart;
