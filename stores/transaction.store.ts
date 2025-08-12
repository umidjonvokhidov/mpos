import axiosInstance from '@/lib/utils';
import { create } from 'zustand';

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  fetchAllTransactions: async () => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);

      if (res.data.success) {
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
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
        console.log(res.data.data);

        return res.data.success;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  },
}));
