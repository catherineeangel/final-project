import { TextField, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import React, { FC, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

interface ThreadTitleProps {
  name: string;
  threadId: string;
  category: string;
  catId;
}

const ThreadTitle: FC<ThreadTitleProps> = ({
  name,
  threadId,
  category,
  catId,
}) => {
  const { role, token } = useAuth();
  const [showEditField, setShowEditField] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setCounter(0), 3000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleEdit = () => {
    if (editedTitle == "") {
      toast.error("Title cannot be empty!");
      return;
    }
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/thread/${threadId}`,
        {
          name: editedTitle,
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
          toast.success("Thread Edited");
          setShowEditField(false);
        }
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
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
    <div className="cursor-pointer flex justify-between p-6 border items-center">
      {showEditField ? (
        <>
          <TextField
            className="w-full"
            variant="standard"
            defaultValue={name}
            onChange={(e) => {
              setEditedTitle(e.target.value);
            }}
          />
          <IconButton onClick={handleEdit}>
            <SendIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <Link
          href={{
            pathname: `/thread/${threadId}`,
            query: {
              title: `${name}`,
              category: `${category}`,
              catId: `${catId}`,
            },
          }}
        >
          <Typography className="w-full" variant="h5">
            {name}
          </Typography>
        </Link>
      )}

      {role == "admin" && (
        <>
          <IconButton onClick={() => setShowEditField(!showEditField)}>
            {showEditField ? <CloseIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={(id) => handleDelete(id)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ThreadTitle;
