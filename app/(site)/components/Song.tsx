'use client';

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import PlayButton from "@/components/PlayButton";

interface SongProps {
  data: Song;
  onClick: () => void;
}

function Song({ data }: SongProps) {
  const imagePath = useLoadImage(data);

  return (
    <article
      className="
        relative group
        flex flex-col items-center justify-center gap-y-1
        p-3 overflow-hidden
        bg-neutral-400/5
        rounded-md 
        cursor-pointer
        transition
        hover:bg-neutral-400/10
      "
    >
      <h3 className="w-full pt-3 font-semibold truncate">{data.title}</h3>
      <p className="w-full pb-4 text-sm text-neutral-400 truncate">By {data.author}</p>
      <Image 
        className="order-first object-cover aspect-square rounded-md" 
        src={imagePath || '/images/liked.png'}
        width={388} height={388}
        alt="Song cover"
        priority={false}
        placeholder="blur"
        blurDataURL="/images/liked.png"
      />
      <div className="absolute right-5 bottom-24">
        <PlayButton />
      </div>
    </article>
  );
}

export default Song;