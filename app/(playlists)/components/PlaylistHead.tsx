import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface PlaylistHeadProps {
  title: string;
  image: string;
  className?: string;
}

function PlaylistHead({ title, image, className }: PlaylistHeadProps) {
  return (
    <div
      className={twMerge(`
        flex flex-col md:flex-row items-center gap-x-5
      `, className)}
    >
      <div className="flex flex-col justify-center gap-y-2 mt-4 md:mt-0">
        <h2 
          className="text-white font-bold text-4xl sm:text-5xl lg:text-7xl"
        >
          {title}
        </h2>
        <p className="order-first hidden md:block font-semibold text-sm">Playlist</p>
      </div>
      <Image 
        className="order-first relative h-32 w-32 lg:h-44 lg:w-44"
        src={image}
        width={176} height={176} 
        alt={`Playlist ${title} cover`}
        placeholder="blur"
        blurDataURL="/images/liked.png"
      />
    </div>
  );
}

export default PlaylistHead;