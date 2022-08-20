import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Custom429: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center h-screen w-full justify-center">
      <p className="text-4xl md:text-6xl p-8  md:border-r-2">429</p>
      <div className="p-8 border-t-2 text-center md:text-left md:border-t-0">
        <p className="text-xl tracking-wide">TOO MANY REQUESTS</p>

        <p className="text-">Please try again later.</p>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Return to HomePage
        </Button>
      </div>
    </div>
  );
};

export default Custom429;
