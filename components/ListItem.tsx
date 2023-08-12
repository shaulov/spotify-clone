'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

function ListItem({ image, name, href }: ListItemProps) {
  const router = useRouter();

  const handleClick = () => {
    // Add authentication beforee push
    router.push(href);
  }

  return (
    <button
      className="
        relative group
        flex items-center gap-x-4
        w-full pr-4
        overflow-hidden
        bg-neutral-100/10
        rounded-md
        transition 
        hover:bg-neutral-100/20
      "
      onClick={handleClick}
    >
      <Image 
        className="
          relavive
          min-h-[64px]
          min-w-[64px] 
          object-cover
        " 
        src={image} 
        width={64} 
        height={64} 
        alt={name} 
        placeholder="blur"
        blurDataURL="/images/liked.png"
      />
      <p className="py-5 font-medium truncate">{name}</p>
      <div 
        className="
          absolute right-5
          flex items-center justify-center
          p-4
          bg-green-500
          rounded-full
          drop-shadow-md
          opacity-0
          transition
          group-hover:opacity-100
          hover:scale-110
        "
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
}

export default ListItem;