import RecentTransactions from '@/components/recent-transactions/RecentTransactions';
import TotalIncome from '@/components/TotalIncome';
import { ScrollArea } from '@/components/ui/scroll-area';
import Statistics from '@/sections/Statistics';

const Dashboard = () => {
  return (
    <ScrollArea className="p-1.5 lg:p-2.5 bg-base-white h-full rounded-b-[10px] max-w-[1536px] mx-auto w-full overflow-hidden">
      <div className="flex flex-col gap-y-2.5">
        <Statistics />
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-2.5 h-full overflow-hidden">
          <RecentTransactions />
          <TotalIncome />
        </section>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
