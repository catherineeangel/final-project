import { IconButton, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@hooks/useAuth";

type PageProps = {
  threads: any[];
  id: string;
};

const Category: NextPage<PageProps> = ({ threads, id }) => {
  const { role, token } = useAuth();
  const router = useRouter();
  const { name } = router.query;

  const [counter, setCounter] = useState<number>(0);

  const [showField, setShowField] = useState<boolean>(false);
  const [threadTitle, setThreadTitle] = useState<string>("");
  const [firstPost, setFirstPost] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setCounter(0), 3000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleAddThread = () => {
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/thread/`,
      {
        categoryId: id,
        name: threadTitle,
        firstPost: {
          content: firstPost,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "X-USER-TOKEN": `${token}`,
        },
      }
    );
  };

  const handleDelete = (id: any) => {
    if (counter == 0) {
      setCounter(counter + 1);
      toast("Click once more to delete.", {
        icon: "⚠️",
      });
      return;
    }

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/thread/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "X-USER-TOKEN": `${token}`,
        },
      })
      .then((res) => {
        res.status == 200 ? toast.success("Category deleted") : "";
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  return (
    <div className="md:p-20 p-10">
      {!!token && (
        <div className="grid place-items-end">
          <div className="flex flex-row items-center">
            <p className="text-base text-gray-800 tracking-wide">New Thread</p>
            <IconButton onClick={handleAddThread}>
              <LibraryAddIcon />
            </IconButton>
          </div>
        </div>
      )}
      {threads?.data?.map(({ id, name }: any) => {
        return (
          <div
            key={id}
            className="cursor-pointer flex justify-between p-8 border items-center"
          >
            <Link href={router.basePath + "/thread/" + id + "?title=" + name}>
              <Typography className="w-full" variant="h5">
                {name}
              </Typography>
            </Link>
            {role == "admin" && (
              <IconButton onClick={(id) => handleDelete(id)}>
                <DeleteForeverIcon />
              </IconButton>
            )}
          </div>
        );
      })}
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
