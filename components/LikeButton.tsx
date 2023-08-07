import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
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
        .eq('user_id', user?.id)
        .eq('song_id', songId)
        .single();
      
      if (data && !error) setIsLiked(true);
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const handleLikeClick = () => {
    if (!user) return authModal.onOpen();

    console.log();
    
    router.refresh();
  }

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button onClick={handleLikeClick}>
      <span className="sr-only">Like song</span>
      <Icon size={25} />
    </button>
  );
}

export default LikeButton;