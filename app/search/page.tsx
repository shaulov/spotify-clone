import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import PageContent from "./components/PageContent";

interface SearchProps {
  searchParams: {
    title: string;
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title);
  
  return (
    <>
      <Header>
        <h1 className="mb-6 text-3xl font-semibold">Search</h1>
        <SearchForm />
      </Header>
      <PageContent songs={songs} />
    </>
  );
}