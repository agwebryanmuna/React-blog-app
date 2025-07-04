import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import Loader from "./commons/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router";

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: async ({ pageParam = 1 }) =>
      postAPI.getPosts( pageParam,  10, searchParams ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <Loader />;

  if (status === "error") return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>Yay! You have seen all posts</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
