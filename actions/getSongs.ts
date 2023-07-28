import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Song } from '@/types';

const getSong = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data) || [];
}

export default getSong;