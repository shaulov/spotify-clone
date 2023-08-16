'use client';

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

function Player() {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  } 

  return (
    <div
      className="
        fixed bottom-0
        w-full h-[80px] px-4 py-2
        bg-black
      "
    >
      <PlayerContent 
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
}

export default Player;