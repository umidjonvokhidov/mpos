'use client';

import { useAuth, useCart, useNotification, useProduct, useUI } from '@/stores';
import Loading from '../loading';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import React from 'react';
import Navbar from '@/components/Navbar';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchUser, isAuthenticated, user, logout, login, register } = useAuth();
  const { fetchNotifications } = useNotification();
  const { fetchCart } = useCart();
  const { fetchProducts } = useProduct();
  const { setIsLoading, isLoading } = useUI();
  const prevAuthRef = React.useRef(isAuthenticated);

  useEffect(() => {
    if (!prevAuthRef.current && isAuthenticated) {
      toast.success('Authentication successful!');
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = new URLSearchParams(window.location.search).get('token');

        if (token) {
          localStorage.setItem('accessToken', token);
          router.replace('/');
          return;
        }

        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
          router.push('/sign-in');
          return;
        }
        const user = await fetchUser();

        if (user && user._id) {
          await Promise.all([fetchNotifications(user._id), fetchProducts(), fetchCart()]);
        } else {
          router.push('/sign-in');
          return;
        }
      } catch (error) {
        console.log(error);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="p-2.5 bg-[#EDEEEF] flex h-full flex-col flex-1 lg:overflow-hidden">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
