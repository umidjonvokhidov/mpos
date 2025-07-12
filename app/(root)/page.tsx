'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores';
import { useEffect } from 'react';

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();


  return (
    <div className="text-purple-500 font-bold text-5xl">
      Dashboard, {isAuthenticated ? user?.firstname : 'Unauthorized'}
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;
