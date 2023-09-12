'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

interface LibraryProps {
  songs: Song[];
}

function Library({ songs }: LibraryProps) {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) return subscribeModal.onOpen();

    return uploadModal.onOpen();
  }
  return (
    <section className="flex flex-col">
      <div 
        className="
          flex items-center justify-between
          px-5 pt-4
          text-neutral-400
        "
      >
        <h2 
          className="
            inline-flex
            items-center
            gap-x-4
          "
        >
          <TbPlaylist size={24} />
          <span>Your Library</span>
        </h2>
        <button className="p-[2px] transition hover:text-white" onClick={handleClick}>
          <AiOutlinePlus size={20} />
          <span className="sr-only">Add song to Library</span>
        </button>
      </div>
      <ul className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map(song => (
          <li key={song.id}>
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Library;