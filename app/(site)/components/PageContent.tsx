import getSongs from "@/actions/getSongs";
import SongList from "./SongList";

async function PageContent() {
  const songs = await getSongs();

  return (
    <section className="mt-4">
      <h2 className="sr-only">Song List</h2>
      <SongList data={songs} />
    </section>
  );
}

export default PageContent;