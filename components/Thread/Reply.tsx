import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import Votes from "./Votes";
import toast from "react-hot-toast";

interface ReplyProps {
  text: string;
}

const Reply = () => {
  const [showReply, setShowReply] = useState<boolean>(false);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="body2" paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <div className="w-full flex justify-end">
            {showReply && (
              <>
                <TextField
                  className="w-10/12"
                  id="standard-basic"
                  variant="standard"
                  placeholder="Reply"
                  multiline
                  InputProps={{ style: { fontSize: 14 } }}
                />
                <IconButton
                  aria-label="reply"
                  onClick={() => {
                    toast.success("Comment Added");
                  }}
                >
                  <SendIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() => {
                setShowReply(!showReply);
              }}
            >
              <ReplyIcon />
            </IconButton>
            <Votes fontSize="small" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reply;
