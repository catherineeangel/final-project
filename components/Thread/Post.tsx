import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReplyIcon from "@mui/icons-material/Reply";
import AddCommentIcon from "@mui/icons-material/AddComment";

import toast from "react-hot-toast";
import Votes from "./Votes";
import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/router";
import ExpandMore from "@components/Expand";

interface PostProps {
  id: string;
  content: string;
  upvote: number;
  downvote: number;
  owner: string;
  isStarter: boolean;
  edited: boolean;
  editMode: boolean;
  threadId: string;
  replyId: string;
}

const Post: FC<PostProps> = ({
  id: postId,
  content,
  edited,
  upvote,
  downvote,
  isStarter,
  editMode,
  threadId,
  replyId,
}) => {
  const router = useRouter();

  const { role, token } = useAuth();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const [contentPost, setContentPost] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>(content);

  const [isEditPost, setIsEditPost] = useState<boolean>(false);

  const handleAddReply = () => {
    if (!!!token) {
      toast.error("Login to add post.");
      return;
    }

    if (contentPost == "") {
      toast.error("Post cannot be empty!");
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/post/`,
        {
          threadId: threadId,
          content: contentPost,
          replyId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "X-USER-TOKEN": `${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Reply Added");
        setContentPost("");
        setExpanded(false);
        router.replace(router.asPath);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };
  const handleEditPost = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`,
        {
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "X-USER-TOKEN": `${token}`,
          },
        }
      )
      .then((res) => {
        res.status;
        toast.success("Post Edited");
        setIsEditPost(false);
        router.replace(router.asPath);
      })
      .catch((e) => {
        const err = e.response.data.error;
        if (err == "failed to edit post") {
          toast.error("You are not allowed to edit this post.");
        } else {
          toast.error(err);
        }
      });
  };
  const handleDeletePost = () => {
    if (counter == 0) {
      setCounter(counter + 1);
      toast("Click once more to delete.", {
        icon: "??????",
      });
      return;
    }
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "X-USER-TOKEN": `${token}`,
        },
      })
      .then((res) => {
        toast.success("Post Deleted");
        router.replace(router.asPath);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
  };

  const scrollToPost = () => {
    console.log(document.getElementById(`${replyId}`));
    const post = document.getElementById(`${replyId}`);
    window.scrollTo({
      top: post.offsetTop - 60,
      behavior: "smooth",
    });
    post.style.backgroundColor = "#90caf9";
    setTimeout(() => {
      post.style.backgroundColor = "white";
    }, 2000);
  };

  return (
    <div>
      <Card className="border-b-2 px-5" id={postId}>
        <CardContent>
          {!!replyId && (
            <div className="flex flex-row pl-4 opacity-80">
              <ReplyIcon fontSize="small" />
              <p className="italic">
                Replied to : &nbsp;
                <button className="underline italic" onClick={scrollToPost}>
                  this post
                </button>
              </p>
            </div>
          )}
          {isEditPost ? (
            <div className="flex flex-row pl-8 -mb-6 relative z-10 w-10/12">
              <TextField
                size="small"
                variant="filled"
                placeholder="Post"
                defaultValue={content}
                className="w-10/12"
                multiline
                onChange={(e) => {
                  setEditedContent(e.target.value);
                }}
              />
              <IconButton aria-label="reply" onClick={handleEditPost}>
                <SendIcon fontSize="small" />
              </IconButton>
            </div>
          ) : (
            <Typography variant="body1" className="pl-6">
              {content}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing className="relative -mt-8 ">
          {!!token && editMode ? (
            <div className="w-full flex items-center flex-row justify-end min-h-[44px]">
              {!isStarter && (
                <IconButton onClick={() => setIsEditPost(!isEditPost)}>
                  <EditIcon />
                </IconButton>
              )}
              {!isStarter && role == "admin" && (
                <IconButton onClick={handleDeletePost}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
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
                postId={postId}
                upvote={upvote}
                downvote={downvote}
              />
            </>
          )}
          {!editMode && (
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <AddCommentIcon />
            </ExpandMore>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form className="flex flex-row px-12 pb-4">
            <TextField
              className="w-full"
              id="standard-basic"
              variant="standard"
              placeholder="Reply"
              multiline
              value={contentPost}
              onChange={(e) => {
                setContentPost(e.target.value);
              }}
            />
            <IconButton aria-label="reply" onClick={handleAddReply}>
              <SendIcon fontSize="small" />
            </IconButton>
          </form>
        </Collapse>
      </Card>
    </div>
  );
};

export default Post;
