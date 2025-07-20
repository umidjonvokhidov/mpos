'use client';

import StatisticCard from '@/components/StatisticCard';
import { statistics } from '@/constants';
import { useAuth } from '@/stores';
import Link from 'next/link';

const Statistics = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col gap-y-5 mx-auto bg-base-black w-full rounded-[12px] p-2.5 lg:p-6">
      <div className="flex items-start flex-col lg:flex-row lg:justify-between lg:items-center gap-y-4">
        <div className="flex w-full items-start flex-col   gap-y-2.5">
          <h3 className="text-2xl lg:text-4xl font-normal  text-base-white">
            Welcome {user?.firstname}
          </h3>
          <p className="text-gray-600 text-sm lg:text-base">
            Be a good and honest employee for everyone's happiness
          </p>
        </div>
        <Link
          href="#"
          className="bg-blue-500 px-6 py-2.5 rounded-[6px] shrink-0 text-[12px] font-normal lg:text-base text-white"
        >
          Make an order
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-5">
        {statistics.map((statistic: StatisticType) => (
          <StatisticCard key={statistic.key} statistic={statistic} />
        ))}
      </div>
    </section>
  );
};

export default Statistics;
