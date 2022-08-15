import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoginModal from "../Form/Login";
import Form from "../Form";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <nav className="px-10 py-5 bg-blue-900 w-full">
      <div className="flex flex-row justify-between">
        <p className="text-white text-4xl font-serif font-semibold">
          Movie Geeks
        </p>
        {/* ini pake redux si kalo dh login dll */}
        <Button
          className="bg-blue-600"
          variant="contained"
          onClick={handleOpen}
        >
          Login
        </Button>
      </div>
      <Form open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </nav>
  );
};

export default Navbar;
