'use client';

import { Separator } from '@/components/ui/separator';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuth } from '@/stores';
import { ScrollArea } from './ui/scroll-area';
import InsiderLoadingWhite from '@/public/lotties/InsiderLoadingWhite.json';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Lottie from 'lottie-react';

const formSchema = z
  .object({
    firstname: z
      .string()
      .min(2, {
        message: 'First name must be at least 2 characters.',
      })
      .max(50, {
        message: 'First name cannot exceed 50 characters.',
      })
      .optional(),
    lastname: z
      .string()
      .min(2, {
        message: 'Last name must be at least 2 characters.',
      })
      .max(50, {
        message: 'Last name cannot exceed 50 characters.',
      })
      .optional(),
    role: z
      .enum(['waiter', 'chef', 'admin'], {
        required_error: 'Please select a valid role.',
      })
      .optional(),
    email: z
      .string()
      .email({
        message: 'Please enter a valid email address.',
      })
      .min(5, {
        message: 'Email must be at least 5 characters.',
      }),
    profilePicture: z.any().optional().or(z.literal(undefined)),
    phoneNumber: z
      .string()
      .min(10, {
        message: 'Phone number must be at least 10 digits.',
      })
      .optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only validate passwords if both are provided
      if (data.oldPassword || data.newPassword) {
        if (!data.oldPassword) {
          return false;
        }
        if (!data.newPassword) {
          return false;
        }
        if (data.oldPassword.length < 6) {
          return false;
        }
        if (data.newPassword.length < 6) {
          return false;
        }
        // Check if new password is different from old password
        if (data.oldPassword === data.newPassword) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        'Both old and new passwords are required, must be at least 6 characters, and new password must be different from old password.',
      path: ['newPassword'], // This will show the error on the newPassword field
    },
  );

const ProfileForm = () => {
  const [open, setOpen] = useState(false);
  const [passwordFieldDisabled, setPasswordFieldDisabled] = useState(true);
  const { user, updateUser, isUserLoading } = useAuth();
  const [preview, setPreview] = useState<string | undefined>(
    user?.profilePicture ? user.profilePicture : '/images/avatar.jpg',
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      role: user?.role,
      email: user?.email || '',
      profilePicture: user?.profilePicture || undefined,
      phoneNumber: user?.phoneNumber || undefined,
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const Profile = await updateUser({ ...values });
    if (Profile) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="lg:flex w-full">
        <DialogTrigger asChild className="w-full">
          <button className="block w-full lg:w-auto lg:flex items-center justify-center text-base-white py-2.5 px-6 border cursor-pointer border-grey-900 rounded-[6px] bg-transparent h-auto">
            Edit Profile
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-[calc(100%-20px)] lg:w-3/4 max-h-[90vh]">
        <DialogHeader className="flex flex-col gap-y-4">
          <DialogTitle className="flex flex-col items-start gap-y-1 text-base lg:text-lg text-base-black font-medium font-satoshi">
            Edit Profile
            <span className="text-sm lg:text-base text-grey-600 font-normal font-satoshi">
              Change Profile
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full"
              encType="multipart/form-data"
            >
              <ScrollArea className="h-full max-h-[70vh] pr-5">
                <div className="flex flex-col gap-y-6 p-1">
                  <div className="flex flex-col items-start gap-y-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex items-center gap-x-4">
                        <div className="relative">
                          <Image
                            src={preview!}
                            width={110}
                            height={110}
                            className="rounded-full cursor-pointer"
                            alt="Profile Photo"
                            onClick={() => {
                              const fileInput = document.getElementById(
                                'profile-picture-input',
                              ) as HTMLInputElement;
                              fileInput?.click();
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="profilePicture"
                            render={({ field: { value, onChange, ...field } }) => (
                              <FormItem className="hidden">
                                <FormControl>
                                  <Input
                                    id="profile-picture-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        onChange(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setPreview(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center gap-y-1.5">
                          <Button
                            type="button"
                            variant="secondary"
                            className="bg-[#FE2A2D]/10 text-[#FE2A2D] hover:bg-[#FE2A2D]/30 transition-all cursor-pointer rounded-[6px]"
                            onClick={() => {
                              setPreview('/images/avatar.jpg');
                              form.setValue('profilePicture', undefined);
                            }}
                          >
                            Remove Image
                          </Button>
                          <span className="font-satoshi text-base text-grey-600">
                            Profile Image
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your Firstname here"
                                className="h-[42px]"
                                maxLength={50}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your Lastname here"
                                maxLength={50}
                                className="h-[42px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your Role here"
                                maxLength={30}
                                disabled
                                className="h-[42px] disabled:bg-grey-50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your Email here"
                                maxLength={100}
                                className="h-[42px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Your Phone Number here"
                                className="h-[42px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-medium">Change Password</h3>
                      <Button
                        variant="outline"
                        className="py-2.5 px-6 h-auto cursor-pointer"
                        onClick={() => setPasswordFieldDisabled(!passwordFieldDisabled)}
                      >
                        Change Password
                      </Button>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                      <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="********"
                                type="password"
                                className="disabled:bg-grey-50 h-[42px]"
                                disabled={passwordFieldDisabled}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="********"
                                className="disabled:bg-grey-50 h-[42px]"
                                type="password"
                                disabled={passwordFieldDisabled}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <Button
                      variant="outline"
                      className="h-auto rounded-[6px] flex-1 lg:flex-none px-6 py-2.5 cursor-pointer w-full lg:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUserLoading}
                      className="h-10 rounded-[6px] flex-1 lg:flex-none px-6 py-2.5 cursor-pointer w-full lg:w-auto"
                    >
                      {isUserLoading ? (
                        <span className="flex items-center translate-x-5">
                          Saving Changes
                          <Lottie
                            className="-translate-x-5 w-[70px] h-[70px]"
                            animationData={InsiderLoadingWhite}
                            loop={true}
                          />
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileForm;
