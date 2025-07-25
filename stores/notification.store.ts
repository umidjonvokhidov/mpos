import axios from 'axios';
import { create } from 'zustand';

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: null,
  fetchNotifications: async (id) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const notifications = res.data.data;

      if (notifications) {
        set({ notifications: notifications });
        return notifications as Notification[];
      }
    } catch (error) {
      console.log(error);
    }
  },
  markNotificationRead: async (id, userID) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      if (res.data.success) {
        await get().fetchNotifications(userID);
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  markAllNotificationsRead: async (id) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-as-read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      if (res.data.success) {
        await get().fetchNotifications(id);
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));
