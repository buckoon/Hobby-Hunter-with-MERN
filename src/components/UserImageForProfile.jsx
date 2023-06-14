import { Avatar } from "@mui/material";

const UserImageForProfile = ({ image, size = "100px" }) => {
  return (
    <Avatar
      src={`https://hobby-hunter-api.onrender.com/assets/${image}`}
      alt="user"
      sx={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
};

export default UserImageForProfile;