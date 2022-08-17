import { Box } from "@mui/system";
import React, { FC, ReactNode, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, TextField } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";

interface CategoryBoxProps {
  text: string;
  id: string;
  icon?: ReactNode;
}

const CategoryBox: FC<CategoryBoxProps> = ({ text, id, icon }) => {
  const { role, token } = useAuth();

  const [counter, setCounter] = useState<number>(0);

  const [name, setName] = useState<string>(text);
  const [showField, setShowField] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setCounter(0), 3000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleEdit = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "X-USER-TOKEN": `${token}`,
          },
        }
      )
      .then((res) => {
        res.status == 200 ? toast.success("Category edited") : "";
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  const handleDelete = () => {
    if (counter == 0) {
      setCounter(counter + 1);
      toast("Click once more to delete.", {
        icon: "⚠️",
      });
      return;
    }
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
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
    <>
      <Box className="relative px-2 w-56 h-56 bg-sky-200 rounded shadow-xl hover:-translate-y-4 ease-in-out duration-300 opacity-80 hover:opacity-100 flex items-center justify-center">
        {showField ? (
          <>
            <TextField
              className="w-full"
              variant="outlined"
              placeholder="Category"
              multiline
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton aria-label="reply" onClick={handleEdit}>
              <KeyboardReturnIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Link href={`/category/${id}?name=${text}`}>
            <p className="py-20 cursor-pointer font-serif text-2xl font-semibold opacity-80 text-center">
              {text}
            </p>
          </Link>
        )}
        {role == "admin" && (
          <>
            <div className="absolute bottom-2 right-2">
              <IconButton
                onClick={() => {
                  setShowField(!showField);
                  setName(text);
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div className="absolute bottom-2 right-10">
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default CategoryBox;
