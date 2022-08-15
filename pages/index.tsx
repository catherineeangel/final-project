import CategoryBox from "@components/Category/CategoryBox";
import Counter from "@components/Counter";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";

type PageProps = {
  categories: any[];
};

const Home: NextPage<PageProps> = ({ categories }) => {
  console.log(categories);
  return (
    <div>
      <Counter />
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
  );
};

export const getServerSideProps = async () => {
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
