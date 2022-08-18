import IconBreadcrumbs from "@components/IconBreadcrumbs";
import Navbar from "@components/Navbar";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <IconBreadcrumbs />
      {children}
    </div>
  );
};

export default Layout;
