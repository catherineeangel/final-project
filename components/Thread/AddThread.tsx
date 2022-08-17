import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { FC, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

interface AddThreadProps {
  categoryId: string;
  token: string;
}

const AddThread: FC<AddThreadProps> = ({ categoryId, token }) => {
  const [showAddField, setShowAddField] = useState<boolean>(false);

  const [threadTitle, setThreadTitle] = useState<string>("");
  const [firstPost, setFirstPost] = useState<string>("");

  const handleAddThread = () => {
    axios.post(
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
    );
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
            >
              <LibraryAddIcon
                className={`${showAddField ? "rotate-45 " : ""} transition-all`}
              />
            </IconButton>
          </div>
        </div>
      )}
      {showAddField && (
        <div className="ease-in-out p-4 flex flex-col w-full gap-y-2 items-end">
          <div className="flex flex-col w-full gap-y-2">
            <TextField
              label="Thread Title"
              variant="standard"
              placeholder="Thread Title"
            />
            <TextField
              label="Starter Post"
              variant="standard"
              placeholder="Post"
              multiline
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
      )}
    </>
  );
};

export default AddThread;
