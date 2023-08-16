'use client';

import useOnPlay from "@/hooks/useOnPlay";
import Song from "./Song";

interface SongListProps {
  data: Song[];
}

function SongList({ data }: SongListProps) {
  const onPlay = useOnPlay(data);

  return (
    <>
      {data.length === 0 
        ? <p className="mt-4 text-neutral-400">No songs avaliable</p>
        : <ul
            className="
              grid 
              grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8
              gap-4
            "
          >
            {data.map(
              (song) => (
                <li key={song.id}>
                  <Song data={song} onClick={(id: string) => onPlay(id)} />
                </li>
              )
            )}
          </ul>
      }
    </>
  );
}

export default SongList;