import React, { FC } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";

interface VotesProps {
  fontSize?: "small" | "inherit" | "large" | "medium";
  className?: string;
}

const Votes: FC<VotesProps> = ({ fontSize, className }) => {
  const handleUpVote = () => {};
  const handleDownVote = () => {};
  return (
    <div className={`${className} flex flex-row justify-end`}>
      <IconButton aria-label="upvote">
        <ThumbUpIcon fontSize={fontSize} />
      </IconButton>
      <IconButton aria-label="downvote">
        <ThumbDownIcon fontSize={fontSize} />
      </IconButton>
    </div>
  );
};

export default Votes;
