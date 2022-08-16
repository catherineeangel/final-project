import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@hooks/useApp";
import { registerUser, userLogin } from "redux/features/user/userActions";

const LoginButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [register, setRegister] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const role = "user";

  const resetFields = () => {
    setUsername("");
    setPassword("");
  };

  // reduxxxx
  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (loading) {
      return;
    }

    if (!!!username || !!!password) {
      toast.error("Please fill in all the boxes!");
      return;
    }

    setUsername(username.toLowerCase()); // to avoid duplicate usernames
    {
      register
        ? dispatch(registerUser({ username, password, role }))
        : dispatch(userLogin({ username, password }));
    }
  };

  useEffect(() => {
    // if registration is success, go to login form
    if (success) {
      resetFields();
      setRegister(false);
    }

    // if login
    if (!!userInfo) {
      setOpen(false);
    }
  }, [success, userInfo]);

  return (
    <div className="">
      <Button
        className="bg-blue-600"
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Login
      </Button>
      <Modal
        className="flex justify-center items-center h-screen"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          component="form"
          sx={{
            borderRadius: 2,
            bgcolor: "background.paper",
            width: 300,
            height: 300,
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          autoComplete="off"
        >
          <div className="flex flex-col w-full h-full justify-center items-center border-gray-600/70 rounded-lg border-2">
            <TextField
              required
              id="outlined-required"
              label="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              disabled={loading}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type={showPass ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    >
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className="bg-blue-600 w-[25ch]"
              variant="contained"
              onClick={handleSubmit}
            >
              {register ? "Register" : "Login"}
            </Button>
            {!register ? (
              <p className="pt-6">
                Don&apos;t have an account?
                <a
                  onClick={() => setRegister(true)}
                  className="text-blue-500 underline"
                >
                  Sign up
                </a>
              </p>
            ) : (
              <p className="pt-6">
                Have an existing account?
                <a
                  onClick={() => setRegister(false)}
                  className="text-blue-500 underline"
                >
                  Login
                </a>
              </p>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginButton;
