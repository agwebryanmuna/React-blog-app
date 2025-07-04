import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import Loader from "./commons/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = 10;
      return postAPI.getPosts(pageParam, limit, searchParams);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (searchParams.has("__clerk_handshake")) {
      // Clone and remove the handshake param
      const cleanParams = new URLSearchParams(searchParams);
      cleanParams.delete("__clerk_handshake");

      setSearchParams(cleanParams);
    }
  }, [searchParams]);

  if (status === "pending")
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error) {
    console.log(error);
    return (
      <div className="mb-12">
        Something went wrong! Please refresh the page.
      </div>
    );
  }

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
