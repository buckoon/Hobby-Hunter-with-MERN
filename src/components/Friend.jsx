import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";

import UserImage from "./UserImage";

const Friend = ({ friendId, name, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  
 


  const isFriend = friends.find((friend) => friend._id === friendId); //check if the friend exists

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <Box className="text-black flex mb-2 bg-zinc-200 justify-between items-center rounded-lg z-10 ease-in duration-500">
      <Box className="flex justify-between items-center gap-1">
        <UserImage image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <h2 className="text-black font-medium hover:text-white cursor-pointer p-2 mr-1">
            {name}
          </h2>
        </Box>
      </Box>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ p: "0.05rem", fontSize: "0.25rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: "grey" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "grey" }} />
        )}
      </IconButton>
    </Box>
  );
  
};

export default Friend;