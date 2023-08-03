'use client';

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

function PageContent({ songs }: PageContentProps) {
  return (
    <section>
      <h2 className="sr-only">Search result</h2>
      {
        songs.length === 0
          ? <p className="w-full px-6 text-neutral-400">No songs found</p>
          : <ul className="flex flex-col gap-y-2 w-full px-6">
              {songs.map(song => (
                <li className="flex items-center gap-x-4 w-full" key={song.id}>
                  <MediaItem data={song} onClick={() => {}} />
                  <button>
                    <span className="sr-only">Like song</span>
                  </button>
                </li>
              ))}
            </ul>
      }
    </section>
  );
}

export default PageContent;