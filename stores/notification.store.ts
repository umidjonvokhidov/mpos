import axiosInstance from '@/lib/utils';
import { create } from 'zustand';
import { toast } from 'sonner';

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: null,
  isNotificationLoading: false,
  fetchNotifications: async (id) => {
    try {
      set({ isNotificationLoading: true });
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications?id=${id}`,
      );

      const notifications = res.data.data;

      if (notifications) {
        set({ notifications: notifications, isNotificationLoading: false });
        return notifications as Notification[];
      }
    } catch (error) {
      set({ isNotificationLoading: false });
      console.log(error);
    }
  },
  markNotificationRead: async (id, userID) => {
    try {
      set({ isNotificationLoading: true });
      const res = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`,
        {},
      );

      if (res.data.success) {
        await get().fetchNotifications(userID);
        set({ isNotificationLoading: false });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      set({ isNotificationLoading: false });
      return false;
    }
  },
  markAllNotificationsRead: async (id) => {
    try {
      set({ isNotificationLoading: true });
      const res = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-as-read/${id}`,
        {},
      );

      if (res.data.success) {
        await get().fetchNotifications(id);
        set({ isNotificationLoading: false });
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      set({ isNotificationLoading: false });
      return false;
    }
  },
}));
