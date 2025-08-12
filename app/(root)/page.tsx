import RecentTransactions from '@/components/recent-transactions/RecentTransactions';
import TotalIncome from '@/components/TotalIncome';
import Statistics from '@/sections/Statistics';

const Dashboard = () => {
  return (
    <main className="p-1.5 lg:p-2.5 bg-base-white h-full rounded-b-[10px] max-w-[1536px] flex flex-col gap-y-2.5 mx-auto w-full overflow-hidden">
      <Statistics />
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-2.5 h-full overflow-hidden">
        <RecentTransactions />
        <TotalIncome />
      </section>
    </main>
  );
};

export default Dashboard;
