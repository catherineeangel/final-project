import {
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
import React, { FC, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Reply from "./Reply";
import toast from "react-hot-toast";
import Votes from "./Votes";
import { useAuth } from "@hooks/useAuth";

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

interface PostProps {
  id: string;
  content: string;
  upvote: number;
  downvote: number;
  owner: string;
  isStarter: boolean;
  edited: boolean;
  editMode: boolean;
}

const Post: FC<PostProps> = ({
  id,
  content,
  edited,
  upvote,
  downvote,
  isStarter,
  editMode,
}) => {
  const { role, token } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleAddPost = () => {};
  const handleDeletePost = () => {};

  return (
    <div>
      <Card className="border-b-2">
        <CardContent>
          <Typography variant="body1" className="pl-6">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="relative -mt-8 md:-mt-10">
          {editMode ? (
            <div className="w-full flex items-center flex-row justify-end">
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          ) : (
            <>
              {edited && (
                <p className="absolute right-40 bottom-4 text-[12px] italic opacity-60 tracking-wide">
                  edited
                </p>
              )}
              <Votes
                className="w-full"
                postId={id}
                upvote={upvote}
                downvote={downvote}
              />
            </>
          )}
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
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
