import icons from '@/public/icons';
import Image from 'next/image';

const DateTime = () => {
  return (
    <div className="border border-grey-100 rounded-[6px] flex items-center gap-x-1.5 py-2 px-2.5 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out">
      <Image src={icons.calendar} width={20} height={20} alt="calendar" />
      <p className='text-xs font-normal leading-4 tracking-tight text-base-black'>Wednesday, 27 Mar 2024 at 9:32AM</p>
    </div>
  );
};

export default DateTime;
