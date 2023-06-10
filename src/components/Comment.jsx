import React from "react";
import { Typography } from "@mui/material";

const Comment = ({ comment }) => {
  return (
    <Typography sx={{ color: "black", m: "0.5rem 0", pl: "1rem" }}>
      {comment}
    </Typography>
  );
};

export default Comment;
