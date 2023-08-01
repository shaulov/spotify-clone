import getSongs from "@/actions/getSongs";
import SongList from "./SongList";

async function PageContent() {
  const songs = await getSongs();

  return (
    <section className="mt-4">
      <SongList data={songs} />
    </section>
  );
}

export default PageContent;