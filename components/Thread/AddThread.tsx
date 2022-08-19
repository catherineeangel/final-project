import { Button, Collapse, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { FC, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface AddThreadProps {
  categoryId: string;
  token: string;
}

const AddThread: FC<AddThreadProps> = ({ categoryId, token }) => {
  const router = useRouter();
  const [showAddField, setShowAddField] = useState<boolean>(false);

  const [threadTitle, setThreadTitle] = useState<string>("");
  const [firstPost, setFirstPost] = useState<string>("");

  const handleAddThread = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/thread/`,
        {
          categoryId: categoryId,
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
      )
      .then((res) => {
        toast.success("Thread added!");
        setThreadTitle("");
        setFirstPost("");
        router.replace(router.asPath);
        setShowAddField(false);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  return (
    <>
      {!!token && (
        <div className="grid place-items-end">
          <div className="flex flex-row items-center">
            <p className="text-base text-gray-800 tracking-wide">New Thread</p>
            <IconButton
              onClick={() => {
                setShowAddField(!showAddField);
              }}
              sx={{
                transform: !showAddField ? "rotate(0deg)" : "rotate(45deg)",
              }}
            >
              <LibraryAddIcon />
            </IconButton>
          </div>
        </div>
      )}

      <Collapse in={showAddField} timeout="auto" unmountOnExit>
        <div className="ease-in-out p-4 flex flex-col w-full gap-y-2 items-end">
          <div className="flex flex-col w-full gap-y-2">
            <TextField
              label="Thread Title"
              variant="standard"
              placeholder="Thread Title"
              value={threadTitle}
              onChange={(e) => {
                setThreadTitle(e.target.value);
              }}
            />
            <TextField
              label="Starter Post"
              variant="standard"
              placeholder="Post"
              multiline
              value={firstPost}
              onChange={(e) => {
                setFirstPost(e.target.value);
              }}
            />
          </div>
          <Button
            variant="outlined"
            size="small"
            className="md:h-8"
            onClick={handleAddThread}
          >
            Add
          </Button>
        </div>
      </Collapse>
    </>
  );
};

export default AddThread;
