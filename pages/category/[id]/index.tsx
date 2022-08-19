//@ts-nocheck
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/useAuth";
import AddThread from "@components/Thread/AddThread";
import ThreadTitle from "@components/Thread/ThreadTitle";
import { Typography } from "@mui/material";

type PageProps = {
  threads: any[];
  id: string;
};

const Category: NextPage<PageProps> = ({ threads, id }) => {
  const { token } = useAuth();
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="md:p-20 p-10">
      <AddThread categoryId={id} token={token} />
      {!!threads.data ? (
        threads?.data?.map(({ id: threadId, name }: any) => {
          return (
            <ThreadTitle
              key={threadId}
              name={name}
              threadId={threadId}
              category={category}
              catId={id}
            />
          );
        })
      ) : (
        <Typography
          className="w-full px-10 border py-6 opacity-60"
          variant="h6"
        >
          No thread for this category yet. Login to create one.
        </Typography>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ res, params }: any) => {
  const { id } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    }
  );
  return {
    props: {
      threads: response.data,
      id: id,
    },
  };
};

export default Category;
