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
import InsiderLoadingWhite from "@/public/lotties/InsiderLoadingWhite.json"
import Lottie from 'lottie-react';


const formSchema = z
  .object({
    firstname: z.string().min(2, 'First name is too short').max(50),
    lastname: z.string().min(2, 'Last name is too short').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordverify: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.passwordverify, {
    message: 'Passwords do not match',
    path: ['passwordverify'],
  });

const SignUp = () => {
  const router = useRouter();
  const { register, isUserLoading } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordverify: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email, firstname, lastname, password } = values;
      const success = await register(firstname, lastname, email, password);

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
            <h4 className="text-2xl font-medium leading-10 tracking-tight mb-2">Create Yout Account!</h4>
            <p className="text-sm font-normal leading-[18px] tracking-tight text-grey-600">
              Please Enter your detail to sign in
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-2.5">
            <div className="flex gap-x-2.5 flex-col sm:flex-row gap-2.5">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Your Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Your Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              disabled={isUserLoading}
              className="w-full h-[42px] rounded-[6px] mt-1.5 bg-base-black text-sm font-normal leading-[18px] tracking-tight text-base-white cursor-pointer"
            >
               {isUserLoading ? <span className='flex items-center translate-x-5'>Signing Up<Lottie className='-translate-x-5 w-[70px] h-[70px]' animationData={InsiderLoadingWhite} loop={true}/></span> : 'Sign Up'}
            </Button>
          </form>
          <p className="text-sm font-normal leading-[18px] tracking-tight text-grey-600">
            You Don't have account ?{' '}
            <Link href="/sign-in" className="font-bold text-base-black">
              Sign In
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
              <span className="text-base-black text-sm font-normal leading-[18px] tracking-tight">Google</span>
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
