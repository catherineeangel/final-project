import React, { FC } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useAuth } from "@hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface VotesProps {
  postId: string;
  upvote: number;
  downvote: number;
  fontSize?: "small" | "inherit" | "large" | "medium";
  className?: string;
}

const Votes: FC<VotesProps> = ({
  postId,
  upvote,
  downvote,
  fontSize,
  className,
}) => {
  const { token } = useAuth();
  const router = useRouter();

  const handleUpVote = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/post/vote`,
        {
          postId: `${postId}`,
          voteType: "upvote",
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
          toast.success("Upvote success");
          router.replace(router.asPath);
        }
      })
      .catch((e) => {
        const err = e.response.data.error;
        if (err == "X-USER-TOKEN header not provided") {
          toast.error("Login to Vote");
          return;
        }
        toast.error(err);
      });
  };

  const handleDownVote = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/post/vote`,
        {
          postId: `${postId}`,
          voteType: "downvote",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "X-USER-TOKEN": `${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Downvote success");
        router.replace(router.asPath);
      })
      .catch((e) => {
        console.log(e);
        const err = e.response.data.error;
        if (err == "X-USER-TOKEN header not provided") {
          toast.error("Login to Vote");
          return;
        }
      });
  };
  return (
    <div className={`${className} flex items-center flex-row justify-end`}>
      <IconButton aria-label="upvote" onClick={handleUpVote}>
        <ThumbUpIcon fontSize={fontSize} />
        <p className="text-sm p-1">{upvote}</p>
      </IconButton>
      <IconButton aria-label="downvote" onClick={handleDownVote}>
        <ThumbDownIcon fontSize={fontSize} />
        <p className="text-sm p-1">{downvote}</p>
      </IconButton>
    </div>
  );
};

export default Votes;
