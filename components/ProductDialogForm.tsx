'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import icons from '@/public/icons';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const formSchema = z.object({
  file: z.instanceof(File, { message: 'Image is required' }).optional().or(z.literal(undefined)),
  stock: z.boolean(),
  category: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
});

interface ProductDialogFormProps {
  handleSubmit: (values: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
}

const ProductDialogForm = ({ handleSubmit, defaultValues }: ProductDialogFormProps) => {
  const [preview, setPreview] = useState<string | undefined>(defaultValues?.imageUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      stock: defaultValues?.stock ?? true,
      category: defaultValues?.category ?? '',
      name: defaultValues?.name ?? '',
      price: defaultValues?.price ?? 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="w-full h-[230px] rounded-[6px] bg-grey-100 mb-1 p-2.5 flex items-center justify-center cursor-pointer overflow-hidden">
                {preview ? (
                  <Image
                    src={preview}
                    sizes='100vw'
                    width={0}
                    height={0}
                    className="object-cover w-full h-full rounded-[6px]"
                    alt="preview"
                  />
                ) : (
                  <Image src={icons.image} width={32} height={32} alt="image-upload" />
                )}
              </FormLabel>
              <FormControl>
                <Input
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
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="cursor-pointer">In Stock</FormLabel>
              <FormControl>
                <Switch
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Drink">Drink</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                    <SelectItem value="Stick">Stick</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Product Price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Upload
        </Button>
      </form>
    </Form>
  );
};

export default ProductDialogForm;
