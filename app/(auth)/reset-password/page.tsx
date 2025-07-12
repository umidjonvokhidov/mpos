'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordverify: z.string().min(8, 'Password must be at least 8 characters'),
});

const resetPassword = () => {
  const router = useRouter();
  const { resetPassword, fetchUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordverify: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newPassword = values.password;
      const success = await resetPassword(newPassword);

      if (success) router.push('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        router.push('/');
        return;
      }
      try {
        const user = await fetchUser();
        if (!user && !email) {
          router.push('/forgot-password');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [fetchUser, router]);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Form {...form}>
        <div className="flex flex-col items-center w-10/12  sm:w-1/2 gap-y-4">
          <div className="flex flex-col items-center">
            <Image src="images/Logo.svg" alt="Logo" width={30} height={30} className="mb-2.5" />
            <h4 className="text-title-xs-medium mb-2">Reset Password!</h4>
            <p className="text-body-md-regular text-grey-600">
              Please enter your new password below. Make sure it’s strong and unique to keep your
              account secure.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-2.5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordverify"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-[42px] rounded-[6px] mt-1.5 bg-base-black text-body-md-regular text-base-white cursor-pointer"
            >
              Change Password
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default resetPassword;
