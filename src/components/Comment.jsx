import React from "react";
import { Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage"; // Import the UserImage component
import { useSelector } from "react-redux";


const Comment = ({ comment, userId, userPicturePath }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <UserImage image={userPicturePath} size="30px" />
      <Typography sx={{ color: "black", m: "0.5rem 0", pl: "1rem" }}>
        {comment}
      </Typography>
    </div>
  );
};

export default Comment;

