import { Typography } from "@mui/material";
import React from "react";
import Post from "./Post";

const ThreadDetail = () => {
  return (
    <div>
      <Typography className="p-8" variant="h4">
        Thread TITLE
      </Typography>
      <Post />
    </div>
  );
};

export default ThreadDetail;
