'use client';

import { useAuth, useNotification, useProduct, useUI } from '@/stores';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import React from 'react';
import Navbar from '@/components/Navbar';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { fetchUser, isAuthenticated, fetchRefreshToken, user } = useAuth();
  const { fetchNotifications, notifications } = useNotification();
  const { setIsLoading, isLoading } = useUI();
  const { products, fetchProducts } = useProduct();
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
        }

        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && !isAuthenticated) {
          const user = await fetchUser();
          if (user && user._id) {
            if (notifications?.length! === 0) await fetchNotifications(user._id);
            if (products?.length! === 0) await fetchProducts();
          }

          if (!user) {
            await fetchRefreshToken();
            const retryUser = await fetchUser();
            if (retryUser && retryUser._id) {
              if (notifications?.length! === 0) await fetchNotifications(retryUser._id);
              if (products?.length! === 0) await fetchProducts();
            }
            if (!retryUser) {
              router.push('/sign-in');
            }
          }
        } else if (!accessToken && !isAuthenticated) {
          router.push('/sign-in');
        }
      } catch (error) {
        console.log(error);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [fetchUser, fetchRefreshToken, isAuthenticated, user, router, setIsLoading]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="p-2.5 bg-[#EDEEEF] flex flex-col flex-1 h-full">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
