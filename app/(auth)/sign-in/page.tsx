'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/stores';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import InsiderLoadingWhite from "@/public/lotties/InsiderLoadingWhite.json"

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

const SignIn = () => {
  const router = useRouter();
  const { login, isUserLoading } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email, password, remember } = values;
      const success = await login(email, password, remember);

      if (success) router.push('/');
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
            <h4 className="text-2xl font-medium leading-10 tracking-tight mb-2">Welcome Back!</h4>
            <p className="text-sm font-normal leading-[18px] tracking-tight text-gray-600">
              Please Enter your detail to sign in
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
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="flex items-center gap-x-1.5">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-xs font-normal leading-4 tracking-tight text-grey-600 cursor-pointer">
                      Remember account
                    </FormLabel>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-normal leading-4 tracking-tight text-grey-600"
                  >
                    Forgot Password
                  </Link>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isUserLoading}
              className="w-full h-[42px] rounded-[6px] mt-1.5 bg-base-black text-sm font-normal leading-[18px] tracking-tight text-base-white cursor-pointer"
            >
              {isUserLoading ? <span className='flex items-center translate-x-5'>Signing In<Lottie className='-translate-x-5 w-[70px] h-[70px]' animationData={InsiderLoadingWhite} loop={true}/></span> : 'Sign In'}
            </Button>
          </form>
          <p className="text-sm font-normal leading-[18px] tracking-tight text-grey-600">
            You Don't have account ?{' '}
            <Link href="/sign-up" className="font-bold text-base-black">
              Sign Up
            </Link>
          </p>
          <span className="w-full before:flex flex relative items-center justify-between before:w-full gap-x-2.5 before:h-px before:bg-grey-200 after:flex after:w-full after:h-px after:bg-grey-200 text-grey-600">
            Or
          </span>
          <Button
            type="button"
            className="w-full h-12 rounded-[6px] bg-base-white border border-grey-100 text-sm font-normal leading-[18px] tracking-tight text-base-white hover:bg-grey-50 cursor-pointer"
          >
            <Link
              href="https://mpos-api-odsd.onrender.com/api/v1/auth/google"
              className="flex items-center w-full justify-center h-full gap-x-1"
            >
              <Image src="icons/google.svg" alt="google" width={24} height={24} />
              <span className="text-base-black text-sm font-normal leading-[18px] tracking-tight">
                Google
              </span>
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
