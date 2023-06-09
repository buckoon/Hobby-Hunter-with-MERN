import { Box, useMediaQuery} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import RandomHobbyWidget from "scenes/widgets/RandomHobbyWidget";
import WeatherWidget from "scenes/widgets/WeatherWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import MyFriendsWidget from "scenes/widgets/MyFriendsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="relative">
      
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          className="w-full h-full object-cover"
          src="https://cdn.osxdaily.com/wp-content/uploads/2017/06/macos-high-sierra-default-wallpaper-fall-mountain-scene-1.jpg"
          alt="/"
        />
        <div className="bg-black/40 absolute top-0 left-0 w-full h-full"></div>
      </div>

      
      <div className="relative z-10">
        <Navbar className="relative w-full" />

        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
          className="z-10"
        >

        
          {isNonMobileScreens && (
            <Box
              flexBasis="26%"
              padding="1.5rem .5rem 0.75rem .5rem"
              
              className="z-10"
            >
              <RandomHobbyWidget
               
              />
              <MyFriendsWidget/>
            </Box>
          )}
          <Box
            flexBasis={isNonMobileScreens ? "42%" : "90%"}
            mt={isNonMobileScreens ? undefined : "2rem"}
            padding={isNonMobileScreens ? "1.5rem .5rem 0.75rem .5rem" : undefined}
            className="z-10 flex-col"
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>

          {isNonMobileScreens && (
            <Box flexBasis="26%" padding="1.5rem .5rem 0.75rem .5rem">
              <WeatherWidget />
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
