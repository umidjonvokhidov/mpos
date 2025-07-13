'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores';
import { useEffect } from 'react';

const formSchema = z.object({
  otp: z.string().min(6, 'Please enter the complete 6-digit OTP'),
});

const verifyOTP = () => {
  const router = useRouter();
  const { verifyOTP, forgotPassword, fetchUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const resendOTP = async () => {
    try {
      const email = localStorage.getItem('email');
      const success = await forgotPassword(email!);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { otp } = values;
      const success = await verifyOTP(otp);

      if (success) router.push('/reset-password');
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
    <div className="flex h-full w-full justify-center items-center">
      <Form {...form}>
        <div className="flex flex-col items-center w-10/12  sm:w-1/2 gap-y-4">
          <div className="flex flex-col items-center">
            <Image src="images/Logo.svg" alt="Logo" width={30} height={30} className="mb-2.5" />
            <h4 className="text-title-xs-medium mb-2">Verify OTP</h4>
            <p className="text-body-md-regular text-grey-600">
              Please enter the 6-digit OTP sent to your email to verify your identity.
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-y-2.5"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-[42px] rounded-[6px] mt-1.5 bg-base-black text-body-md-regular text-base-white cursor-pointer"
            >
              Verify Code
            </Button>
          </form>
          <p className="text-body-md-regular text-grey-600">
            Didn't get a code ?{' '}
            <Link href="#" onClick={resendOTP} className="font-bold text-base-black">
              Click to resend
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default verifyOTP;
