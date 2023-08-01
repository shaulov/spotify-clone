import { FaPlay } from "react-icons/fa";

function PlayButton() {
  return (
    <button 
      className="
        p-4
        bg-green-500
        rounded-full drop-shadow-md
        opacity-0
        transition translate translate-y-1/4
        group-hover:opacity-100 group-hover:translate-y-0
        hover:scale-110
      "
    >
      <FaPlay fill="black" />
    </button>
  );
}

export default PlayButton;