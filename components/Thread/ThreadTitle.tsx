import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface ThreadTitleProps {
  title: string;
}

const ThreadTitle: FC<ThreadTitleProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="cursor-pointer">
      <Link href={router.asPath + "/" + title}>
        <Typography className="p-8 border" variant="h5">
          {title}
        </Typography>
      </Link>
    </div>
  );
};

export default ThreadTitle;
