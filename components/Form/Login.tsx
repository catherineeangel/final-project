import { Box, Button, Modal, TextField } from "@mui/material";
import React, { FC, useState } from "react";

interface LoginModalProps {
  open: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ open, handleOpen, handleClose }) => {
  const [register, setRegister] = useState<boolean>(false);
  const handleLogin = () => {};
  const handleRegister = () => {};

  return (
    <div className="">
      <Modal
        className="flex justify-center items-center h-screen"
        open={open}
        onClose={handleClose}
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
          // noValidate
          autoComplete="off"
        >
          <div className="flex flex-col w-full h-full justify-center items-center border-gray-600/70 rounded-lg border-2">
            <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder="Email"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder="Password"
            />
            <Button className="bg-blue-600 w-[25ch]" variant="contained">
              {register ? "Register" : "Login"}
            </Button>
            {/* {!register && (
              <p className="pt-6">
                Don&apos;t have an account?{" "}
                <a
                  onClick={() => setRegister(true)}
                  className="text-blue-500 underline"
                >
                  Sign up
                </a>
              </p>
            )} */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
