import RecentTransactions from '@/components/recent-transactions/RecentTransactions';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProfileStatistics from '@/sections/ProfileStatistics';

const ProfilePage = () => {
  return (
    <ScrollArea className="p-1.5 lg:pb-2.5 lg:px-6 lg:pt-6 bg-base-white h-screen rounded-b-[10px] max-w-[1536px]  mx-auto w-full overflow-hidden">
      <div className="flex flex-col gap-y-2.5 lg:gap-y-5">
        <div className="flex flex-col gap-y-1.5 items-start">
          <h2 className="text-2xl lg:text-4xl text-base-black">Detail Profile</h2>
          <p className="text-grey-600 text-sm lg:text-base">
            Be a good and honest employee for everyone's happiness
          </p>
        </div>
        <section className="grid grid-cols-1 gap-2.5 h-full overflow-hidden">
          <ProfileStatistics />
          <RecentTransactions />
        </section>
      </div>
    </ScrollArea>
  );
};

export default ProfilePage;
