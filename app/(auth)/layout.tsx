'use client';

import { features } from '@/constants';
import { useAuth, useUI } from '@/stores';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../loading';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user, isAuthenticated, fetchUser, fetchRefreshToken } = useAuth();
  const router = useRouter();
  const { setIsLoading, isLoading } = useUI();

  useEffect(() => {
    setIsLoading(true);
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && !isAuthenticated) {
          const user = await fetchUser();

          if (!user) {
            await fetchRefreshToken();
            const retryUser = await fetchUser();

            if (retryUser) {
              router.push('/');
              return;
            }
          } else {
            router.push('/');
            return;
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [fetchUser, fetchRefreshToken, isAuthenticated, router, setIsLoading]);

  useEffect(() => {
    if (user && isAuthenticated) {
      router.push('/');
    }
  }, [user, isAuthenticated, router]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="grid grid-cols-1 lg:grid-cols-2 p-2.5 h-screen">
      <div>{children}</div>
      <div className="bg-[radial-gradient(60.21%_42.58%_at_50%_50%,_#141C30_0%,_#050810_100%)] rounded-[10px] lg:flex flex-col items-center justify-between h-full hidden">
        <Link href="/">
          <Image
            src="images/logo-dark.svg"
            alt="feature"
            width={0}
            height={0}
            className="w-auto mt-9"
            sizes="100vw"
          />
        </Link>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides={true}
          centeredSlidesBounds={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop
          modules={[Pagination, Autoplay]}
          className="w-full max-w-full mb-[60px] px-5"
        >
          {features.map(({ title, description, image }: FeatureType, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-between pb-9 h-[600px]">
                <Image
                  src={image}
                  alt="feature"
                  width={0}
                  height={0}
                  className="w-[600px] h-auto max-h-[400px] object-contain"
                  sizes="100vw"
                />
                <div className="flex flex-col items-center w-full max-w-[488px]">
                  <h4 className="text-base-white text-2xl font-medium leading-10 tracking-tight text-center">{title}</h4>
                  <p className="font-inter text-grey-700 text-center">{description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default AuthLayout;
