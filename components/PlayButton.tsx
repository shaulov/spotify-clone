import { twMerge } from "tailwind-merge";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  className: string;
  onClick: () => void;
}

function PlayButton({ className, onClick }: PlayButtonProps) {
  return (
    <button 
      className={twMerge(`
        static
        p-4
        bg-green-500
        rounded-full drop-shadow-md
        opacity-0
        transition translate translate-y-1/4
        group-hover:opacity-100 group-hover:translate-y-0
        hover:scale-110
        focus:opacity-100
      `, className)}
      onClick={onClick}
    >
      <FaPlay fill="black" />
    </button>
  );
}

export default PlayButton;