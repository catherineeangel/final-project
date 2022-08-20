import IconBreadcrumbs from "@components/IconBreadcrumbs";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }: any) => {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      {!router.pathname.startsWith("/4") && <IconBreadcrumbs />}
      {children}
    </div>
  );
};

export default Layout;
