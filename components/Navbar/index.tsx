import React from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@hooks/useApp";
import { logout } from "redux/features/user/userSlice";
import LoginButton from "@components/Form/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { blue } from "@mui/material/colors";

const Navbar = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { token: userToken, username } = userInfo ?? {
    token: null,
    username: null,
  };

  const dispatch = useAppDispatch();

  return (
    <nav className="px-10 py-5 bg-blue-900 w-full">
      <div className="flex flex-row justify-between">
        <p className="hidden md:block text-white text-4xl font-serif font-semibold">
          Movie Geeks
        </p>
        <div className="md:hidden">
          <Image
            alt="Movie Geeks"
            src={"/movie-icon.png"}
            width={40}
            height={40}
          />
        </div>

        {!!userToken ? (
          <>
            <div className="hidden md:flex flex-row items-center space-x-4">
              <Typography className="text-white text-xl">
                Hi, {username}!
              </Typography>
              <Button
                className="bg-blue-600"
                variant="contained"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Button>
            </div>
            <div className="md:hidden">
              <IconButton
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogoutIcon
                  style={{ color: blue[100], fontSize: 32 }}
                  className="border-2 border-gray-300 rounded p-1"
                />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
