import axiosInstance from '@/lib/utils';
import { create } from 'zustand';
import { toast } from 'sonner';

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isTransactionLoading: false,
  fetchUserTransactions: async (user) => {
    try {
      set({ isTransactionLoading: true });
      let res;
      if (user && user.role === 'waiter') {
        res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
          params: {
            id: user._id,
          },
        });
      } else {
        res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
      }

      if (res.data.success) {
        set({ transactions: res.data.data, isTransactionLoading: false });

        return res.data.success;
      }
    } catch (error) {
      set({ isTransactionLoading: false });
      console.log(error);
    }
  },
  fetchAllTransactionReports: async () => {
    try {
      set({ isTransactionLoading: true });
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?status=completed`,
      );

      if (res.data.success) {
        set({ isTransactionLoading: false });
        return res.data.success;
      }
    } catch (error) {
      set({ isTransactionLoading: false });
      console.log(error);
    }
  },
  fetchUserTransactionReports: async (id) => {
    try {
      set({ isTransactionLoading: true });
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?id=${id}&status=completed`,
      );

      if (res.data.success) {
        set({ transactions: res.data.data, isTransactionLoading: false });
        return res.data.success;
      }
    } catch (error) {
      set({ isTransactionLoading: false });
      console.log(error);
    }
  },
  getTransaction: async (id) => {
    try {
      set({ isTransactionLoading: true });
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`);

      if (res.data.success) {
        set({ isTransactionLoading: false });
        return res.data.data;
      }
    } catch (error) {
      set({ isTransactionLoading: false });
      console.log(error);
    }
  },
  updateTransactionStatus: async (id, status) => {
    try {
      set({ isTransactionLoading: true });
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
        { status },
      );

      if (res.data.success) {
        await get().fetchUserTransactions();
        set({ isTransactionLoading: false });
        toast.success('Transaction status updated successfully!');
        return res.data.success;
      }
    } catch (error) {
      set({ isTransactionLoading: false });
      console.log(error);
    }
  },
}));
