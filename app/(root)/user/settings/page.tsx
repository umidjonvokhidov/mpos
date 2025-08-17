'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/stores';

const formSchema = z.object({
  language: z.enum(['en', 'ru', 'uz']),
  region: z.enum([
    'Samarkand',
    'Bukhara',
    'Khiva',
    'Nukus',
    'Fergana',
    'Andijan',
    'Tashkent',
    'Termiz',
  ]),
  timeFormat: z.enum(['12h', '24h']),
  dateFormat: z.enum(['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD']),
  notifications: z.object({
    productUpdated: z.boolean(),
    statusOrder: z.boolean(),
  }),
  email: z.object({
    dailyDigest: z.boolean(),
  }),
});

type FormData = z.infer<typeof formSchema>;

const SettingsPage = () => {
  const { user, updateUserSettings } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: user?.settings?.language,
      region: user?.settings?.region,
      timeFormat: user?.settings?.timeFormat,
      dateFormat: user?.settings?.dateFormat,
      notifications: {
        productUpdated: user?.settings?.notifications.productUpdated,
        statusOrder: user?.settings?.notifications.statusOrder,
      },
      email: {
        dailyDigest: user?.settings?.email.dailyDigest,
      },
    },
  });

  const onSubmit = async (values: FormData) => {
    const UserSettings = await updateUserSettings(values);
    if (UserSettings) {
      console.log('Update User Settings successful');
    }
  };

  return (
    <section className="max-w-[1536px] bg-grey-100 p-2.5 lg:p-0">
      <div className="flex flex-col gap-y-6 bg-base-white p-2.5 rounded-[6px] lg:rounded-none">
        <div className="flex flex-col gap-y-1.5">
          <h1 className="font-satoshi text-4xl text-base-black">Settings</h1>
          <p className="font-satoshi text-base text-grey-600">
            Customize your preferences for a better work experience
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-[6px] border border-grey-100 p-6"
          >
            <div className="flex flex-col gap-y-6">
              {/* Time Zone and Language Section */}
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-xl font-medium">Time Zone and Language</h2>
                  <p className="text-grey-600">Configure your regional and language preferences</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="uz">O'zbekcha</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Tashkent">Tashkent</SelectItem>
                            <SelectItem value="Samarkand">Samarkand</SelectItem>
                            <SelectItem value="Bukhara">Bukhara</SelectItem>
                            <SelectItem value="Khiva">Khiva</SelectItem>
                            <SelectItem value="Nukus">Nukus</SelectItem>
                            <SelectItem value="Fergana">Fergana</SelectItem>
                            <SelectItem value="Andijan">Andijan</SelectItem>
                            <SelectItem value="Termiz">Termiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select time format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                            <SelectItem value="24h">24-hour</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                            <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Notifications Section */}
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-base font-medium">Notifications</h2>
                  <p className="text-grey-600">
                    Manage your notifications to track important updates and messages.
                  </p>
                </div>
                <div className="flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="notifications.productUpdated"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Product Updates</FormLabel>
                          <FormDescription>
                            Get notified when products are updated or modified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notifications.statusOrder"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Order Status Changes</FormLabel>
                          <FormDescription>
                            Receive notifications when order status changes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Email Section */}
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-base font-medium">Email Preferences</h2>
                  <p className="text-grey-600">
                    Customize your email preferences to receive relevant updates and productivity
                    tips.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email.dailyDigest"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Daily Digest</FormLabel>
                        <FormDescription>
                          Receive a daily summary of activities and updates
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" className="px-8">
                  Save Settings
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SettingsPage;
