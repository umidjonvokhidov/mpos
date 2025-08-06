import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import axiosInstance from '@/lib/utils';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (isAuthenticated, user) => {
    set({ isAuthenticated, user });
  },
  fetchUser: async () => {
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);

      const user = res.data.user as User;
      set({ user, isAuthenticated: true });
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  // fetchRefreshToken: async () => {
  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
  //       {},
  //       { withCredentials: true },
  //     );

  //     if (res.data.accessToken) {
  //       localStorage.setItem('accessToken', res.data.accessToken);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // },
  logout: async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`,
        {},
        { withCredentials: true },
      );
      localStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false });

      if (res.data.success) {
        toast.success('You have been logged out successfully.');
      }
      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
  login: async (email, password, remember) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        {
          email,
          password,
          remember,
        },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success('You have been logged in successfully!');
        localStorage.setItem('accessToken', res.data.data.token);
        set({ user: res.data.data.user, isAuthenticated: true });
      }

      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
  register: async (firstname, lastname, email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        firstname,
        lastname,
        email,
        password,
      });

      if (res.data.success) {
        set({ user: res.data.data.user, isAuthenticated: true });
        toast.success('You have been registered successfully!');
        localStorage.setItem('accessToken', res.data.data.token);
      }
      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
  forgotPassword: async (email) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email,
      });

      if (res.data.success) {
        localStorage.setItem('email', email);
        toast.success(
          'A 6-digit reset code has been sent to your email. It will expire in 10 minutes.',
        );
      }

      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
  verifyOTP: async (otp) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        email: localStorage.getItem('email'),
        otp,
      });

      if (res.data.success) {
        toast.success('Code verified successfully! You may now reset your password.');
      }

      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
  resetPassword: async (newPassword) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        email: localStorage.getItem('email'),
        newPassword,
      });

      if (res.data.success) {
        localStorage.removeItem('email');
        toast.success(
          'Your password has been reset successfully! You can now sign in with your new password.',
        );
      }
      return res.data.success;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  },
}));
