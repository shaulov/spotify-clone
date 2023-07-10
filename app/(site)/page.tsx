import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import { AppRoute } from '@/const';

export default function Home() {
  return (
    <>
      <Header>
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
              href={AppRoute.Liked}
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
        <div>
          List of Songs!
        </div>
      </section>
    </>
  )
}
