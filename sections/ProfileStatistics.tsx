'use client';

import StatisticCard from '@/components/StatisticCard';
import { Button } from '@/components/ui/button';
import { statistics } from '@/constants';
import getStatisticsDashboard from '@/lib/getStatisticsDashboard';
import { useAuth, useTransaction } from '@/stores';
import Image from 'next/image';
import Link from 'next/link';

const ProfileStatistics = () => {
  const { user } = useAuth();
  const { transactions } = useTransaction();

  let statisticData = getStatisticsDashboard(statistics, transactions);

  return (
    <section className="flex flex-col gap-y-5 mx-auto bg-base-black w-full rounded-[12px] p-2.5 lg:p-6">
      <div className="flex items-start flex-col lg:flex-row lg:justify-between lg:items-center gap-y-4">
        <div className="flex gap-x-6 items-start">
          <Image
            src={user?.profilePicture ? user.profilePicture : '/images/avatar.jpg'}
            sizes="100vw"
            unoptimized
            width={0}
            height={0}
            className="rounded-full max-w-[102px] max-h-[102px] size-full min-h-[61px] min-w-[61px]"
            alt="Profile Picture"
          />
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-start gap-x-4">
                <h4 className="text-3xl text-base-white">{user?.firstname}</h4>
                <span className="py-1 px-3 rounded-[21px] text-base-white bg-grey-900 text-sm">
                  Male
                </span>
              </div>
              <p className="text-grey-600 text-base">{user?.email}</p>
            </div>
            <Button className="bg-transparent hidden lg:block text-base-white py-2.5 px-6 border cursor-pointer border-grey-900 rounded-[6px]">
              Edit Profile
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4 lg:items-end lg:gap-y-12">
          <div className="text-base text-grey-500">
            Birthday
            <span className="text-base-white ml-2.5">10/18/2025</span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col gap-y-2.5 items-start">
              <h5 className="text-grey-500 text-base">First seen</h5>
              <h6 className="text-base-white text-base">19 Jan 2024</h6>
            </div>
            <div className="self-stretch w-px bg-grey-900 lg:flex" />
            <div className="flex flex-col gap-y-2.5 items-start">
              <h5 className="text-grey-500 text-base">Position</h5>
              <h6 className="text-base-white text-base capitalize">{user?.role}</h6>
            </div>
            <div className="self-stretch w-px bg-grey-900 lg:flex" />
            <div className="flex flex-col gap-y-2.5 items-start">
              <h5 className="text-grey-500 text-base">User</h5>
              <h6 className="text-base-white text-base flex items-center">
                <div className="size-1.5 rounded-full bg-success-600 mr-1.5" />
                Online
              </h6>
            </div>
          </div>
        </div>
        <Button className="bg-transparent block lg:hidden w-full text-base-white py-2.5 px-6 border cursor-pointer border-grey-900 rounded-[6px]">
          Edit Profile
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-5">
        {statisticData.map((statistic: StatisticType) => (
          <StatisticCard key={statistic.key} statistic={statistic} />
        ))}
      </div>
    </section>
  );
};

export default ProfileStatistics;
