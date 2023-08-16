'use client';

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

interface MediaItemProps {
  className?: string;
  data: Song;
  onClick: (id: string) => void;
}

function MediaItem({ className, data, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: default turn on player
  }

  return (
    <article
      className={twMerge(`
        grid grid-cols-[48px_auto] items-center gap-x-3
        w-full p-2
        rounded-md
        cursor-pointer
        hover:bg-neutral-800/50
      `, className)}
    >
      <h3 className="text-white truncate">{data.title}</h3>
      <p className="text-sm text-neutral-400 truncate">{data.author}</p>
      <div
        className="
          row-span-2
          relative order-first
          min-w-[48px] min-h-[48px]
          overflow-hidden
          rounded-md
        "
      >
        <Image 
          className="object-cover" 
          src={imageUrl || '/images/liked.png'} 
          width={48} height={48} 
          alt="Media item"
          placeholder="blur"
          blurDataURL="/images/liked.png"
        />
      </div>
    </article>
  );
}

export default MediaItem;