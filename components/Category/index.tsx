import Link from "next/link";
import React, { Suspense } from "react";
import CategoryBox from "./CategoryBox";
import { useQuery } from "react-query";
import { getCategory } from "queries/getCategory";
import { SkeletonWrapper } from "@components/Skeleton";
import Skeleton from "react-loading-skeleton";

const Category = () => {
  return (
    <div className="mx-auto my-10 w-11/12 md:w-8/12">
      <p className="font-sans tracking-widest text-xl font-semibold my-5">
        Categories
      </p>
      <Suspense
        fallback={
          <SkeletonWrapper baseColor="#2D2F45" highlightColor="#3E405B">
            <Skeleton
              count={10}
              height="65px"
              borderRadius="20px"
              className="mb-4"
            />
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">
          {/* {categories.map((category: string, i: number) => {
            return (
              <Link key={category} href={`/category/${category}`}>
                <div>
                  <CategoryBox text={category} />
                </div>
              </Link>
            );
          })} */}
        </div>
      </Suspense>
    </div>
  );
};

export default Category;
