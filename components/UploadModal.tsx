'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import uniqid from 'uniqid';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

function UploadModal() {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });

  const handleChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const handleFromSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueId = uniqid();

      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        return toast.error('Failed song upload')
      }

      const { 
        data: imageData, 
        error: imageError 
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        return toast.error('Failed image upload')
      }

      const {
        error: supabaseError
      } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success('Song created');
      uploadModal.onClose();
      reset();
    } catch(error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={handleChange}
    >
      <form
        onSubmit={handleSubmit(handleFromSubmit)}
        className="flex flex-col gap-y-4"
      >
        <label className="sr-only" htmlFor="title">Enter a song title</label>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <label className="sr-only" htmlFor="author">Enter a author name</label>
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <label>
          Select a song file
          <Input
            className="mt-1"
            id="file"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </label>
        <label>
          Select an image
          <Input
            className="mt-1"
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </label>
        <Button disabled={isLoading} type="submit">Create</Button>
      </form>
    </Modal>
  );
}

export default UploadModal;