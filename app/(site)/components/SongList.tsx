'use client';

import Song from "./Song";

interface SongListProps {
  data: Song[];
}

function SongList({ data }: SongListProps) {
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
              song => <li key={song.id}><Song data={song} onClick={() => console.log('render')} /></li>
            )}
          </ul>
      }
    </>
  );
}

export default SongList;