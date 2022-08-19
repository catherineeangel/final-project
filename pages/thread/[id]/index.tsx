import Post from "@components/Thread/Post";
import { useAuth } from "@hooks/useAuth";
import {
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import toast from "react-hot-toast";

type ThreadDetailType = {
  id: string;
  content: string;
  upvote: number;
  downvote: number;
  owner: string;
  isStarter: boolean;
  edited: boolean;
  replyId: string;
};

const Thread: NextPage = ({ threads, id: threadId }: any) => {
  const router = useRouter();
  const { username, token } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [expand, setExpand] = useState<boolean>(false);

  const [content, setContent] = useState<string>("");

  const handleAddPost = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/post/`,
        {
          threadId: threadId,
          content: content,
          replyId: "",
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
        setContent("");
        setExpand(false);
        router.replace(router.asPath);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  return (
    <div>
      <div className="flex flex-row justify-between px-8 items-center">
        <Typography className="pt-8" variant="h4">
          {threads?.name}
        </Typography>
        {!!username && (
          <div className="flex flex-row pl-2 space-x-2">
            <Button
              size="small"
              className="bg-grey"
              variant={editMode ? "contained" : "outlined"}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              {editMode ? "Read" : "Edit"}
            </Button>
            <IconButton
              onClick={() => {
                setExpand(!expand);
              }}
              sx={{ transform: !expand ? "rotate(0deg)" : "rotate(45deg)" }}
            >
              <LibraryAddIcon />
            </IconButton>
          </div>
        )}
      </div>
      <Collapse in={expand} timeout="auto" unmountOnExit className="px-12 py-2">
        <p className="font-semibold ">New Post</p>
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
          <TextField
            variant="standard"
            placeholder="Content"
            multiline
            className="w-full md:w-10/12"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <Button
            variant="outlined"
            size="small"
            className="md:h-8"
            onClick={handleAddPost}
          >
            Add
          </Button>
        </div>
      </Collapse>
      {threads?.data?.map(({ ...props }: ThreadDetailType) => {
        return (
          <div key={props.id}>
            <Post {...props} editMode={editMode} threadId={threadId} />
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async ({ res, params }: any) => {
  const { id } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/thread/${id}`,
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

export default Thread;
