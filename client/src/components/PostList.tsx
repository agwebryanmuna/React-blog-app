import PostListItem from "./PostListItem";
import { useQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import type { PostType } from "../api/model/post/post.types";

const PostList = () => {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: ():Promise<PostType> => postAPI.getPosts(),
  // });

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
