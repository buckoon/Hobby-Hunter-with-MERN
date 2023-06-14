
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImageForProfile from "components/UserImageForProfile";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
 
  
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { setFriends } from "state";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`https://hobby-hunter-api.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    const getFriends = async () => {
      try {
        const response = await fetch(
          `https://hobby-hunter-api.onrender.com/users/${userId}/friends`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch friends.");
        }
        const data = await response.json();
        dispatch(setFriends(data.friends));
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getUser();
      getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      
    } = user;
  
    return (
      <Box className ="bg-zinc-200 p-6 pb-3 rounded-lg"
      >
        <Box
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box gap="1rem">
            <UserImageForProfile
              image={picturePath}
              style={{ width: "150px !important", height: "150px !important" }} // Set the desired width and height
            />
            <Box
                sx={{ paddingTop: '1rem' }}
            >
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.main,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
            </Box>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
  
         
        </Box>
  
        <Divider />
 
  
        <Box p="1rem 0">  
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
                >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </Box>  
      </Box>
    );
  };
  
  export default UserWidget;
  