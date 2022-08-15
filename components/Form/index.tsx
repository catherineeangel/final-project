import React, { FC } from "react";
import LoginModal from "./Login";

export interface ModalProps {
  open: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
}

const Form: FC<ModalProps> = ({ open, handleOpen, handleClose }) => {
  return (
    <div>
      <LoginModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Form;
