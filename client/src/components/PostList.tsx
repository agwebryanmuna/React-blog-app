import PostListItem from "./PostListItem";
import { useQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";

const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postAPI.getPosts(),
  });

  if (isPending) {
    console.log("Still pendiing...");
  }
  if (error) {
    console.log(error);
  }

  if (!isPending && !error) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-12 mb-8">
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  );
};

export default PostList;
