import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import PlaylistHead from "../components/PlaylistHead";
import PageContent from "./components/PageContent";

export default async function Liked() {
  const songs = await getLikedSongs();

  return (
    <>
      <Header className="from-emerald-800">
        <h1 className="sr-only">Playlist page</h1>
        <PlaylistHead 
          className="mt-20"
          title="Liked Songs" 
          image="/images/liked.png" 
          />
      </Header>
      <PageContent songs={songs} />
    </>
  );
}