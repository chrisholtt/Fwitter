import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import useCurrentUser from '@/hooks/useCurrentUser';
import { PiBellBold } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { TbHeartPlus } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: FaMagnifyingGlass,
      label: 'Explore',
      href: '/explore',
    },
    {
      icon: PiBellBold,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: MdOutlineMail,
      label: 'Messages',
      href: '/conversations',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: RxPerson,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
    {
      icon: TbHeartPlus,
      label: 'New Post',
      href: `/`,
      auth: true,
    },
    {
      icon: IoWalletOutline,
      label: 'Wallet',
      href: `/wallet`,
      auth: true,
      isGradient: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px] flex flex-col justify-center items-center">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isGradient={item.isGradient}
            />
          ))}
          {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
          {/* <SidebarTweetButton /> */}
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
