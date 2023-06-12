import { Avatar } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Avatar
      src={`https://hobby-hunter-api.onrender.com/assets/${image}`}
      alt="user"
      sx={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
};

export default UserImage;
