import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import { AppRoutes } from '@/const';

export default async function Home() {
  return (
    <>
      <Header className="from-emerald-800">
        <h1 className="mb-2 text-3xl font-semibold">Welcome back</h1>
        <ul
          className="
            grid
            grid-cols-1
            sm:grid-cols-2 xl:grid-cils-3 2xl:grid-cols-4
            gap-3
            mt-4
          "
        >
          <li>
            <ListItem 
              image="/images/liked.png"
              name="Liked Songs"
              href={AppRoutes.Liked}
            />
          </li>
        </ul>
      </Header>
      <section className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Newest songs
          </h2>
        </div>
        <PageContent />
      </section>
    </>
  )
}
