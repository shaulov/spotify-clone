import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
}

function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();
  const { supabaseClient } = useSessionContext();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error} = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();
      
      if (data && !error) setIsLiked(true);
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const handleLikeClick = async () => {
    if (!user) return authModal.onOpen();

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);
      
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId });
      
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Added to Liked Song');
      }
    }

    router.refresh();
  }

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button className="transition hover:opacity-75" onClick={handleLikeClick}>
      <span className="sr-only">Like song</span>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

export default LikeButton;