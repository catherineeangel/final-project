import { Box } from "@mui/system";
import React, { FC, ReactNode } from "react";

interface CategoryBoxProps {
  text: string;
  icon?: ReactNode;
}

const CategoryBox: FC<CategoryBoxProps> = ({ text, icon }) => {
  return (
    <>
      <Box className="px-2 w-56 h-56 bg-sky-200 rounded shadow-xl hover:-translate-y-4 ease-in-out duration-300 opacity-80 hover:opacity-100 flex items-center justify-center">
        <p className="font-serif text-2xl font-semibold opacity-80">{text}</p>
      </Box>
    </>
  );
};

export default CategoryBox;
