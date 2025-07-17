'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const forgotPassword = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email } = values;
      const success = await forgotPassword(email);

      if (success) router.push('/verify-otp');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Form {...form}>
        <div className="flex flex-col items-center w-10/12  sm:w-1/2 gap-y-4">
          <div className="flex flex-col items-center">
            <Image src="images/Logo.svg" alt="Logo" width={30} height={30} className="mb-2.5" />
            <h4 className="text-2xl font-medium leading-10 tracking-tight mb-2">Forgot Password!</h4>
            <p className="text-sm font-normal leading-[18px] tracking-tight text-grey-600">
              Enter your registered email address below and we’ll send you instructions to reset
              your password.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-2.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-[42px] rounded-[6px] mt-1.5 bg-base-black text-sm font-normal leading-[18px] tracking-tight text-base-white cursor-pointer"
            >
              Send Verification Code
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default forgotPassword;
