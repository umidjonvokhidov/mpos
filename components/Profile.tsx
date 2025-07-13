import icons from '@/public/icons';
import Image from 'next/image';

const Profile = () => {
  return (
    <div className="flex items-center gap-x-1 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out p-2.5 rounded-[6px]">
      <Image src="/images/avatar.png" width={32} height={32} alt="avatar" />
      <div className="flex-col items-start hidden xl:flex">
        <h4 className="text-body-sm-medium text-base-black">Laealier</h4>
        <p className="text-[10px] leading-normal text-grey-600">Laealier@mangcoding.com</p>
      </div>
      <Image
        src={icons.arrowUpDown1}
        width={17}
        height={17}
        unoptimized
        alt="arrow-up-down"
        className="hidden xl:flex"
      />
    </div>
  );
};

export default Profile;
