import Header from "@/components/Header";
import PageContent from "./components/PageContent";

export default async function Account() {
  return (
    <>
      <Header>
        <h1 className="mb-6 text-3xl font-semibold">Account Settings</h1>
      </Header>
      <PageContent />
    </>
  );
}