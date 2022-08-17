import Post from "@components/Thread/Post";
import { useAuth } from "@hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type ThreadDetailType = {
  id: string;
  content: string;
  upvote: number;
  downvote: number;
  owner: string;
  isStarter: boolean;
  edited: boolean;
};

const Thread: NextPage = ({ threads }: any) => {
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
        )}
      </div>
      {threads?.data
        ?.filter((post: any) => {
          return post.replyId === "";
        })
        .map(({ ...props }: ThreadDetailType) => {
          return (
            <div key={props.id}>
              <Post {...props} editMode={editMode} />
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
    },
  };
};

export default Thread;
