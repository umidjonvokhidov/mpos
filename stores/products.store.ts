import axios from 'axios';
import { create } from 'zustand';
import axiosInstance from '@/lib/utils';
import { toast } from 'sonner';

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      const products = res.data.data;

      if (res.data.success) {
        console.log(products);
        set({ products: products });
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (data: ProductFormValues) => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        await get().fetchProducts();
        toast.success('Create Success', { description: 'Product addition successfully done!' });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (id) => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (id, data) => {
    try {
      const res = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (res.data.success) {
        await get().fetchProducts();
        toast.success('Update Success', { description: 'Product update successfully done!' });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

      if (res.data.success) {
        await get().fetchProducts();
        toast.success('Delete Success', { description: 'Product deletion successfully done!' });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
