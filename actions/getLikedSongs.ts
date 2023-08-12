import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Song from "@/app/(site)/components/Song";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data: sessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error)
    return [];
  }

  if (!data) return [];

  return data.map(item => ({...item.songs}));
}

export default getLikedSongs;