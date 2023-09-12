'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import Button from './Button';
import { AppRoutes } from '@/const';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps): JSX.Element {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: reset any playing songs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  } 

  return (
    <header
      className={twMerge(`
        h-fit p-6
        bg-gradient-to-b
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
            onClick={() => router.push(AppRoutes.Root)}
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
            onClick={() => router.push(AppRoutes.Search)}
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="grid grid-flow-col justify-between items-center gap-x-4"
        >
          {user 
          ? (
            <>
              <Button
                className="px-6 py-2 bg-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => router.push(AppRoutes.Account)}
              >
                <FaUserAlt />
              </Button>
            </>
          ) 
          : (
            <>
              <Button
                className="px-6 py-2 font-medium text-neutral-300 bg-transparent"
                onClick={authModal.onOpen}
              >
                Sign up
              </Button>
              <Button
                className="px-6 py-2 bg-white"
                onClick={authModal.onOpen}
              >
                Log in
              </Button>
            </>
          )}
        </div>
      </nav>
      {children}
    </header>
  );
}

export default Header;