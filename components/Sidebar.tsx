'use client';

import { ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';

interface SidebarProps {
	children: ReactNode;
}

function Sidebar({ children }: SidebarProps): JSX.Element {
  const pathname = usePathname();

  const routs = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    }
  ], [pathname]);
	
  return (
    <div className="flex h-full">
      <nav 
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          w-[300px]
          h-full
          p-2
          bg-black
        "
      >
        <Box>
          <ul
            className="
              flex flex-col gap-y-4
              px-5 py-4
            "
          >
            {routs.map((item) => (
              <li key={item.label}>
                <SidebarItem {...item} />
              </li>
            ))}
          </ul>
        </Box>
        <Box className='h-full overflow-y-auto'>
          Song Library
        </Box>
      </nav>
      <main className="flex-1 h-full py-2 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;