import CategoryBox from "@components/Category/CategoryBox";
import Counter from "@components/Counter";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";

type PageProps = {
  categories: any[];
};

const Home: NextPage<PageProps> = ({ categories }) => {
  return (
    <div>
      <div className="mx-auto my-10 w-11/12 md:w-8/12">
        <p className="font-sans tracking-widest text-xl font-semibold my-5">
          Categories
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">
          {categories.map(({ id, name }, i: number) => {
            return (
              <Link key={id} href={`/category/${id}`}>
                <div>
                  <CategoryBox text={name} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ res }: any) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    }
  );
  return {
    props: {
      categories: response.data,
    },
  };
};

export default Home;
