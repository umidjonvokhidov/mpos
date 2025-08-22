import RecentTransactions from '@/components/recent-transactions/RecentTransactions';
import { ScrollArea } from '@/components/ui/scroll-area';
import Statistics from '@/sections/Statistics';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'MPos',
  description:
    'A modern, user-friendly point of sale (POS) system for efficient product management, sales tracking, and business reporting.',
};

const Dashboard = () => {
  return (
    <ScrollArea className="p-1.5 lg:p-2.5 bg-base-white h-screen rounded-b-[10px] max-w-[1536px] mx-auto w-full overflow-hidden">
      <div className="flex flex-col h-full gap-y-2.5">
        <Statistics />
        <section className="grid grid-cols-1 gap-2.5 h-full overflow-hidden">
          <RecentTransactions />
        </section>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
