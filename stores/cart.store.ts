import { create } from 'zustand';
import { toast } from 'sonner';
import axiosInstance from '@/lib/utils';

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  cartProperties: null,
  fetchCart: async () => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);

      if (res.data.success) {
        set({ cart: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  },
  addToCart: async (id) => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        productId: id,
      });

      if (res.data.success) {
        get().fetchCart();
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred');
      return false;
    }
  },
  removeFromCart: async (id) => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
        productId: id,
      });

      toast.info('Response');
      if (res.data.success) {
        get().fetchCart();
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred');
      return false;
    }
  },
  clearCart: async () => {
    try {
      const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {});

      toast.info('Response');
      if (res.data.success) {
        get().fetchCart();
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred');
      return false;
    }
  },
  deleteFromCart: async (id) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove-complete`,
        { productId: id },
      );

      toast.info('Response');
      if (res.data.success) {
        get().fetchCart();
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred');
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
      toast.error('An error occurred');
    }
  },
  clearCartProperties: () => {
    localStorage.removeItem('cartProperties');
    set({ cartProperties: null });
  },
  checkoutCart: async () => {
    try {
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
          return res.data.url;
        }
      } else {
        toast.error('Cart properties are not set');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  },
}));

export default useCartStore;
