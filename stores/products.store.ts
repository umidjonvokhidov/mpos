import axios from 'axios';
import { create } from 'zustand';
import axiosInstance from '@/lib/utils';
import { toast } from 'sonner';

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isProductLoading: false,
  fetchProducts: async () => {
    try {
      set({ isProductLoading: true });
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      const products = res.data.data;

      if (res.data.success) {
        set({ products: products, isProductLoading: false });
        return products;
      }
    } catch (error) {
      set({ isProductLoading: false });
      console.log(error);
    }
  },
  createProduct: async (data: ProductFormValues) => {
    try {
      set({ isProductLoading: true });
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        await get().fetchProducts();
        set({ isProductLoading: false });
        toast.success('Create Success');
        return res.data.success;
      }
    } catch (error) {
      set({ isProductLoading: false });
      console.log(error);
    }
  },
  getProduct: async (id) => {
    try {
      set({ isProductLoading: true });
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

      if (res.data.success) {
        set({ isProductLoading: false });
        return res.data.data;
      }
    } catch (error) {
      set({ isProductLoading: false });
      console.log(error);
    }
  },
  updateProduct: async (id, data) => {
    try {
      set({ isProductLoading: true });
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
        set({ isProductLoading: false });
        toast.success('Update Success');
        return res.data.success;
      }
    } catch (error) {
      set({ isProductLoading: false });
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ isProductLoading: true });
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

      if (res.data.success) {
        await get().fetchProducts();
        set({ isProductLoading: false });
        toast.success('Delete Success');
        return res.data.success;
      }
    } catch (error) {
      set({ isProductLoading: false });
      console.log(error);
    }
  },
}));
