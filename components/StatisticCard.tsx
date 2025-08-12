import icons from '@/public/icons';
import Image from 'next/image';
import Link from 'next/link';

interface StatisticCardProps {
  statistic: StatisticType;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistic }) => {
  const { key, icon, title, value, change, changePositive, subValue, currency, viewAllPath } =
    statistic;
  return (
    <div className="relative p-2.5 lg:p-3 bg-base-white/[0.08] rounded-xl z-0 flex flex-col gap-y-3">
      <div
        className="absolute inset-0 rounded-xl p-[2px] z-[-1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="flex items-center gap-x-1 lg:gap-x-3">
        <div className="p-[2.5px] lg:p-1.5 rounded-[5px] bg-base-white/[0.06]">
          <Image src={icon} width={20} height={20} alt={title} />
        </div>
        <h6 className="text-base-white text-sm lg:text-base">{title}</h6>
      </div>
      <div className="flex flex-col gap-y-2 lg:gap-y-3">
        <div className="flex justify-between items-center">
          <h5 className="text-base text-base-white font-medium lg:text-2xl">
            {statistic.key === 'totalIncome' && '$'}
            {value}
          </h5>
          {change && (
            <span className="py-1 px-1.5 text-[12px] rounded-full bg-[#F7FCF7]/10 text-success-300">
              {change}
            </span>
          )}
        </div>
        <hr className="border border-grey-900" />
        <div className="flex flex-col items-start gap-y-1.5 lg:gap-y-2">
          <div className="flex items-center justify-between w-full">
            <h6 className="text-sm text-grey-700 hidden lg:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </h6>
            <h5 className="text-sm text-base-white">${subValue}</h5>
          </div>
          <span className="flex items-center gap-x-1">
            <Link href={viewAllPath} className="text-sm text-base-white">
              View all
            </Link>
            <Image src={icons.arrowRight3} width={20} height={20} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
