import { create } from 'zustand';
import { toast } from 'sonner';
import axiosInstance from '@/lib/utils';

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  isCartLoading: false,
  cartProperties: null,
  fetchCart: async () => {
    try {
      set({ isCartLoading: true });
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);

      if (res.data.success) {
        set({ cart: res.data.data, isCartLoading: false });
        return res.data.data;
      }
    } catch (error) {
      set({ isCartLoading: false });
      console.log(error);
    }
  },
  addToCart: async (id) => {
    try {
      set({ isCartLoading: true });
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        productId: id,
      });

      if (res.data.success) {
        get().fetchCart();
        set({ isCartLoading: false });
        return res.data.success;
      }
    } catch (error) {
      set({ isCartLoading: false });
      console.log(error);
      return false;
    }
  },
  removeFromCart: async (id) => {
    try {
      set({ isCartLoading: true });
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
        productId: id,
      });

      if (res.data.success) {
        get().fetchCart();
        set({ isCartLoading: false });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      set({ isCartLoading: false });
      return false;
    }
  },
  clearCart: async () => {
    try {
      set({ isCartLoading: true });
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {});

      if (res.data.success) {
        get().fetchCart();
        set({ isCartLoading: false });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      set({ isCartLoading: false });
      return false;
    }
  },
  deleteFromCart: async (id) => {
    try {
      set({ isCartLoading: true });
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove-complete`,
        { productId: id },
      );

      if (res.data.success) {
        get().fetchCart();
        set({ isCartLoading: false });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      set({ isCartLoading: false });
      return false;
    }
  },
  setCartProperties: () => {
    const stored = localStorage.getItem('cartProperties');
    if (stored) {
      const cartProperty = JSON.parse(stored);
      set({ cartProperties: cartProperty });
    }
  },
  confirmCartProperties: (cartProperties) => {
    try {
      if (cartProperties) {
        localStorage.setItem('cartProperties', JSON.stringify(cartProperties));
        get().setCartProperties();
      }
    } catch (error) {
      console.log(error);
    }
  },
  clearCartProperties: () => {
    localStorage.removeItem('cartProperties');
    set({ cartProperties: null });
  },
  checkoutCart: async () => {
    try {
      set({ isCartLoading: true });
      if (get().cartProperties) {
        const res = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`,
          {
            typeService: get().cartProperties?.typeService,
            products: get().cart?.products,
            tableNumber: get().cartProperties?.tableNumber,
            fullname: get().cartProperties?.fullname,
            description: get().cartProperties?.description,
          },
        );

        toast.success('Operation successful');

        if (res.data.success) {
          get().fetchCart();
          get().clearCartProperties();
          set({ isCartLoading: false });
          return res.data.url;
        }
      }
    } catch (error) {
      set({ isCartLoading: false });
      console.log(error);
    }
  },
}));

export default useCartStore;
