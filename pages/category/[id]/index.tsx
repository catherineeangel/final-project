import ThreadTitle from "@components/Thread/ThreadTitle";
import type { NextPage } from "next";

const Category: NextPage = () => {
  return (
    <div className="md:p-20 p-10">
      <ThreadTitle title="Top 10 RomCom Movies of all time" />
      <ThreadTitle title="RomCom movies to watch with a date" />
    </div>
  );
};

export default Category;
