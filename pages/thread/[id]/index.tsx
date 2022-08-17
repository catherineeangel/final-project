import Post from "@components/Thread/Post";
import { useAuth } from "@hooks/useAuth";
import { Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

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
  const { title } = router.query;
  const { username, role } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-row justify-between px-8 items-center">
        <Typography className="pt-8" variant="h4">
          {threads?.name}
        </Typography>
        {!!username && (
          <div className="flex flex-row space-x-2">
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
            <IconButton>
              <LibraryAddIcon />
            </IconButton>
          </div>
        )}
      </div>
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
