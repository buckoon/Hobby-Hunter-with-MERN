import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://hobby-hunter-api.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));

    // Fetch profile pictures for comments in each post
    const updatedPosts = await Promise.all(
      data.map(async (post) => {
        const updatedComments = await Promise.all(
          post.comments.map(async (comment) => {
            const userResponse = await fetch(
              `https://hobby-hunter-api.onrender.com/users/${comment.userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const user = await userResponse.json();
            const userPicturePath = user.picturePath;

            return { ...comment, userPicturePath };
          })
        );

        return { ...post, comments: updatedComments };
      })
    );

    dispatch(setPosts({ posts: updatedPosts }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.slice().reverse().map(
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
