'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores';

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="text-purple-500 font-bold text-5xl h-full bg-base-white rounded-b-[10px]">
      Dashboard, {isAuthenticated ? user?.firstname : 'Unauthorized'}
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;
