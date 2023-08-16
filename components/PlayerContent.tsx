'use client';

import { useEffect, useState } from "react";
import useSound from "use-sound";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import usePlayer from "@/hooks/usePlayer";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import { Song } from "@/types";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const player = usePlayer();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids.at(-1)!);
    }

    player.setId(previousSong);
  }

  const [play, { pause, sound }] = useSound(
    songUrl,
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3'],
    },
  );

  useEffect(() => {
    sound?.play();
    
    return () => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    !isPlaying ? play() : pause();
  }

  const toggleMute = () => {
    volume === 0 ? setVolume(1) : setVolume(0);
  }

  return(
    <div className="grid grid-cols-2 md:grid-cols-3 justify-start w-full h-full">
      <div className="flex irems-center gap-x-4">
        <MediaItem className="w-max" data={song} onClick={() => {}} />
        <LikeButton songId={song.id} />
      </div>
      <div 
        className="
          flex md:hidden
          col-auto
          justify-end items-center
          w-full
        "
      >
        <button 
          className="
            flex items-center justify-center
            w-10 h-10 p-1
            bg-white
            rounded-full
          "
          onClick={handlePlay}
        >
          <span className="sr-only">Play/Pause</span>
          <Icon className="text-black" size={30} />
        </button>
      </div>
      <div
        className="
          hidden md:flex
          justify-center items-center gap-x-6
          w-full h-full max-w-[722px]
        "
      >
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onPlayPrevious}
        >
          <span className="sr-only">Play the previous song</span>
          <AiFillStepBackward size={30} />
        </button>
        <button 
          className="
            flex items-center justify-center
            w-10 h-10 p-1
            bg-white
            rounded-full
          "
          onClick={handlePlay}
        >
          <span className="sr-only">Play/Pause</span>
          <Icon className="text-black" size={30} />
        </button>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onPlayNext}
        >
          <span className="sr-only">Play the next song</span>
          <AiFillStepForward size={30} />
        </button>
      </div>
      <div 
        className="
          hidden md:flex 
          justify-end items-center gap-x-2
          w-full pr-2
        "
      >
        <button onClick={toggleMute}>
          <VolumeIcon size={34} />
        </button>
        <Slider 
          className="w-[86px]"
          value={volume}
          onChange={(value) => setVolume(value)}
        />
      </div>
    </div>
  );
}

export default PlayerContent;