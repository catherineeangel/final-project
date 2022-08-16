import React from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@hooks/useApp";
import { logout } from "redux/features/user/userSlice";
import LoginButton from "@components/Form/Login";
import { Typography } from "@mui/material";

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
        <p className="text-white text-4xl font-serif font-semibold">
          Movie Geeks
        </p>

        {!!userToken ? (
          <div className="flex flex-row items-center space-x-4">
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
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
