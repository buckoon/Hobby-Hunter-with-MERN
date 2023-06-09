import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();  //so we can use Redux
  const posts = useSelector((state) => state.posts); //so we can grab the store list of posts
  const token = useSelector((state) => state.token); //so we can grab the token as well from Redux

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", { //this will grab all of the posts from the backend
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, //validates the API call
    });
    const data = await response.json(); //make it usable with response.json
    dispatch(setPosts({ posts: data }));//updates store
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`, 
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            
          />
        )
      )}
    </>
  );
};

export default PostsWidget;