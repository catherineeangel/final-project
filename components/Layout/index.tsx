import Navbar from "@components/Navbar";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
