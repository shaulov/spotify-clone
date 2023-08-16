'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { Song } from "@/types";
import { AppRoute } from "@/const";

interface PageContentProps {
  songs: Song[];
}

function PageContent({ songs }: PageContentProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(AppRoute.Root);
    }
  }, [isLoading, user, router]);

  return (
    <section>
      <h2 className="sr-only">Song list</h2>
      {
        songs.length === 0
        ? <p className="px-6  text-neutral-400">No liked songs</p>
        : <ul className="flex flex-col gap-y-2 w-full px-6">
            {songs.map(song => (
              <li className="flex items-center gap-x-4 w-full" key={song.id}>
                <MediaItem data={song} onClick={(id:string) => onPlay(id)} />
                <LikeButton songId={song.id} />
              </li>
            ))}
          </ul>
      }
    </section>
  );
}

export default PageContent;