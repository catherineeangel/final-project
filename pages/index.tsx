import CategoryBox from "@components/Category/CategoryBox";
import axios from "axios";
import type { NextPage } from "next";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getCategory } from "queries/getCategory";
import { useAuth } from "@hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const {
    data: categories,
    refetch,
    isLoading,
    isError,
  } = useQuery("categories", getCategory);

  if (isError) {
    router.push("/429");
  }

  const { role, token } = useAuth();

  const [showField, setShowField] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleAddCategory = () => {
    if (showField == false) {
      setShowField(true);
      return;
    }

    if (categoryName == "") {
      toast.error("Please fill in the field.");
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "X-USER-TOKEN": `${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setCategoryName("");
          toast.success("Category Added");
          refetch();
        }
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  return (
    <div>
      <div className="mx-auto my-10 w-11/12 md:w-8/12">
        <div className="font-sans tracking-widest flex flex-row items-center text-xl font-semibold my-5">
          <p className="pr-2">Categories</p>
          {showField && (
            <TextField
              className=" w-1/2"
              variant="standard"
              placeholder="Category Name"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              value={categoryName}
            />
          )}
          {role == "admin" && (
            <IconButton onClick={handleAddCategory}>
              <LibraryAddIcon />
            </IconButton>
          )}
          {showField && (
            <IconButton onClick={() => setShowField(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">
          {isLoading
            ? [...Array(6)].map((_, i) => {
                return (
                  <Skeleton
                    key={i}
                    count={1}
                    height="224px"
                    width="224px"
                    borderRadius="10px"
                    className="mr-4"
                  />
                );
              })
            : categories?.map(({ id, name }: any) => {
                return (
                  <div key={id}>
                    <CategoryBox text={name} id={id} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
