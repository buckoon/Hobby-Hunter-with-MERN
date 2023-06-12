import { EditOutlined, DeleteOutlined, ImageOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  IconButton,
  TextField
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
 
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [displayInput, setDisplayInput] = useState(false);
  const handleDisplayInput = () => {
    setDisplayInput(!displayInput);
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`https://hobby-hunter-api.onrender.com/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="pb-3 flex-col items-center space-y-2">
      <div className="flex items-center justify-center">
        <button
          onClick={handleDisplayInput}
          className="flex flex-row px-16 py-3 border-b border-gray-600
                     hover:bg-indigo-300 transition-all duration-200  justify-center  text-white rounded-lg hover:shadow-xl font-medium z-5 cursor-pointer"
        >
          Add a Hobby
        </button>
      </div>
      {displayInput && (
        <Box className="text-black  flex p-5 mb-5 bg-zinc-200 justify-center rounded-lg border shadow-lg  flex-col z-10 ease-in duration-500">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserImage image={picturePath} sx={{ marginRight: '0.5rem' }} />
            <Box sx={{ backgroundColor: 'white', flexGrow: 1, marginLeft: '1rem', borderRadius: '4px' }}>
              <TextField
                placeholder="List your favorite hobby and instructions..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                multiline
                rows={3}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>

          {isImage && (
            <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      className="border-2 border-indigo-600 dashed"
                      p="16px"
                      width="100%"
                      sx={{ borderStyle:"dashed",
                        "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          <Divider sx={{ margin: "1.25rem 0" }} />

          <div className="flex justify-between items-center">
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Attach an Image
              </Typography>
            </FlexBetween>

            <Button
              disabled={!post}
              onClick={handlePost}
              style={{
                color: '#FFFFFF',
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
              }}
            >
              POST
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};

export default MyPostWidget;
