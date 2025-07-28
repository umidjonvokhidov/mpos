import axios from 'axios';
import { create } from 'zustand';

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

      const products = res.data.data;

      if (res.data.success) {
        set({ products: products });
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (data: ProductFormValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      console.log(res);

      if (res.data.success) {
        await get().fetchProducts();
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (id) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (res.data.success) {
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
