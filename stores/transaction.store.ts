import axiosInstance from '@/lib/utils';
import { create } from 'zustand';
import { toast } from 'sonner';

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  fetchAllTransactions: async () => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);

      if (res.data.success) {
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred', { description: (typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)) });
    }
  },
  fetchUserTransactions: async (user) => {
    try {
      let res;
      if (user.role === 'waiter') {
        res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
          params: {
            id: user._id,
          },
        });
      } else {
        res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
      }

      if (res.data.success) {
        set({ transactions: res.data.data });

        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred', { description: (typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)) });
    }
  },
  fetchAllTransactionReports: async () => {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?status=completed`,
      );

      if (res.data.success) {
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred', { description: (typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)) });
    }
  },
  fetchUserTransactionReports: async (id) => {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions?id=${id}&status=completed`,
      );

      if (res.data.success) {
        return res.data.success;
      }
    } catch (error) {
      toast.error('An error occurred', { description: (typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)) });
    }
  },
  getTransaction: async (id) => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`);

      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      toast.error('An error occurred', { description: (typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)) });
    }
  },
}));
