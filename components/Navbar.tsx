'use client';

import { navItems } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import icons from '@/public/icons';
import Notification from './Notification';
import Profile from './Profile';
import DateTime from './DateTime';
import { useState } from 'react';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="bg-base-white w-full rounded-t-[10px] min-h-14 flex gap-3 justify-between items-center p-2.5 lg:flex-row flex-col">
      <div className="flex items-center gap-6 w-full justify-between lg:w-auto">
        <Image
          src="/images/logo-light.svg"
          width={0}
          height={0}
          alt="Logo"
          sizes="100vw"
          className="h-[30px] w-auto"
        />
        <ul className="items-center hidden gap-2 lg:flex">
          {navItems.map(({ name, path }: NavItem, index: number) => (
            <li key={index}>
              <Link
                href={path}
                className={twMerge(
                  'py-2 px-6 text-grey-600 text-body-md-regular rounded-[8px] hover:bg-base-black/80 hover:text-base-white transition-all ease-in-out duration-300',
                  pathname === path && 'bg-base-black text-base-white',
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center lg:hidden gap-3">
          <Notification />
          <div
            className="border p-2 cursor-pointer border-grey-100 rounded-[6px]"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <Image src={icons.hamburger} width={24} height={24} alt="hamburger" />
          </div>
        </div>
      </div>
      <ul
        className={twMerge(
          'items-center w-full lg:hidden gap-2 flex flex-col overflow-hidden transition-all duration-400 ease-linear',
          navOpen ? 'max-h-96' : 'max-h-0',
        )}
      >
        {navItems.map(({ name, path }: NavItem, index: number) => (
          <li key={index} className="w-full flex">
            <Link
              href={path}
              className={twMerge(
                'py-2 px-6 text-grey-600 text-body-md-regular w-full flex  md:w-2/3 mx-auto rounded-[8px] hover:bg-base-black/80 hover:text-base-white transition-all ease-in-out duration-300',
                pathname === path && 'bg-base-black text-base-white',
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center h-full gap-x-3 justify-between w-full lg:w-auto">
        <DateTime />
        <div className="self-stretch w-px my-2.5 bg-grey-200 hidden lg:flex" />
        <div className="hidden lg:flex">
          <Notification />
        </div>
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
