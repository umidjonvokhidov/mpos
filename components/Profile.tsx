import icons from '@/public/icons';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/stores';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const signOutUser = async () => {
    await logout();
    router.push('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-1 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out p-2.5 rounded-[6px]">
          <Image
            src={user?.profilePicture ? user.profilePicture : '/images/avatar.jpg'}
            width={32}
            height={32}
            alt="avatar"
            className='rounded-full'
          />
          <div className="flex-col items-start hidden xl:flex">
            <h4 className="text-xs font-medium leading-4 tracking-tight text-base-black">
              {user?.firstname}
            </h4>
            <p className="text-[10px] leading-normal text-grey-600">{user?.email}</p>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-[200px] mr-6">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href="/user/profile">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/user/settings">Settings</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOutUser()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
