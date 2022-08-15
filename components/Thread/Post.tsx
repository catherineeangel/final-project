import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { red } from "@mui/material/colors";
import Reply from "./Reply";
import toast from "react-hot-toast";
import Votes from "./Votes";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // let hex = Math.floor(Math.random() * 0xffffff);
  // let color = "#" + hex.toString(16);

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {/* ini tar color avatarnya di randomize */}RA
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: "h6" }}
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body1">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Votes className="w-full" />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form className="flex flex-row px-5">
            <TextField
              className="w-full"
              id="standard-basic"
              variant="standard"
              placeholder="Comment"
              multiline
            />
            <IconButton
              aria-label="reply"
              onClick={() => {
                toast.success("Comment Added");
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </form>
          <div className="divide-black-400 divide-y-2">
            <Reply />
            <Reply />
          </div>
        </Collapse>
      </Card>
    </div>
  );
};

export default Post;
