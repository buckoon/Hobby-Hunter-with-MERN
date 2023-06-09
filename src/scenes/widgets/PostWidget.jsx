import React from "react";

import { Avatar, Box, Divider, Typography, useTheme, IconButton, useMediaQuery  } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined, ChatBubbleOutlineOutlined, ShareOutlined } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  
  
  const isSmScreen = useMediaQuery("(min-width: 481px) and (max-width: 768px)");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="flex flex-col p-3 mb-5 rounded-lg border bg-zinc-200 drop-shadow-lg border-b shadow-2xl" style={{ marginBottom: '40px', justifyContent: 'space-between' }}>
      <div className="flex flex-col justify-between mr-2" >
        <div className="flex items-center">
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
          />
        </div>
        <Divider sx={{ mb: 2 }} />
        <p style={{ wordBreak: 'break-word' }}>
          {description}
        </p>
      </div>
  
      <div>
        {picturePath && (
          <img
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="post"
            className="rounded-lg"
          />
        )}
      </div>
      <Divider sx={{ mt: 2 }} />
  
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
  
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </div>
  );
  
};

export default PostWidget;
