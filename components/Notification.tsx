import icons from '@/public/icons';
import Image from 'next/image';

const Notification = () => {
  return (
    <div className="flex items-center justify-center border border-grey-100 rounded-[6px] p-2 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out">
      <Image src={icons.notification} width={20} height={20} alt="notification" />
    </div>
  );
};

export default Notification;
