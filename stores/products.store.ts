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
}));
