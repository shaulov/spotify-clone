'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps): JSX.Element {
  const router = useRouter();

  return (
    <header
      className={twMerge(`
        h-fit p-6
        bg-gradient-to-b
        from-emerald-800
        rounded-lg
      `,
      className)}
    >
      <nav 
        className="
          flex items-center justify-between
          w-full mb-4
        "
      >
        <div
          className="
            hidden md:flex
            items-center gap-x-2
          "
        >
          <button 
            className="
              flex items-center justify-center
              bg-black
              rounded-full
              transition
              hover:opacity-75
            "
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            className="
              flex items-center justify-center
              bg-black
              rounded-full
              transition
              hover:opacity-75
            "
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className="flex md:hidden items-center gap-x-2">
          <button
            className="
              flex items-center justify-center
              p-2
              bg-white
              rounded-full
              hover:opacity-75
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
              flex items-center justify-center
              p-2
              bg-white
              rounded-full
              hover:opacity-75
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
            flex
            justify-between
            items-center
            gap-x-4
          "
        >
          
        </div>
      </nav>
    </header>
  );
}

export default Header;