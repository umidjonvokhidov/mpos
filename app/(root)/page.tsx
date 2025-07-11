'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from '../loading';
import { Axis3D } from 'lucide-react';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      let token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      try {
        setLoading(true);
        if (!user) {
          token = localStorage.getItem('accessToken');
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.user);
          console.log(res);
        }
        router.replace('/');
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // router.push('/sign-in');
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`);
          console.log(res);
        }
        // console.log(error);
      }
    };

    fetchUser();
  }, [router, loading, setLoading]);

  return loading ? (
    <Loading />
  ) : (
    <div className="text-purple-500 font-bold text-5xl">
      Dashboard, {user ? user.firstname : 'Unauthorized'}
    </div>
  );
};

export default Dashboard;
