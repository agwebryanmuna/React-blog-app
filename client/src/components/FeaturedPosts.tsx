import { useQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import Image from "./commons/Image";
import { Link } from "react-router";
import Loader from "./commons/Loader";
import { format } from "timeago.js";

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => {
      const limit = 4;
      return postAPI.getFeaturedPosts(limit);
    },
  });

  if (isPending) return <Loader />;

  if (error) {
    return (
      <div>
        Something went wrong! See other{" "}
        <Link to={"/posts/"} className="text-blue-600">
          posts
        </Link>
      </div>
    );
  }

  const posts = data.posts;
  if (!posts || posts.length === 0) return;

  return (
    <div className=" mt-8 flex flex-col lg:flex-row gap-9">
      {/* FIRST POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* IMAGE */}
        {posts[0].img && (
          <Image src={posts[0].img} className="rounded-3xl object-cover" />
        )}{" "}
        {/* DETAILS */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="/" className="text-blue-800 lg:text-lg">
            {posts[0].category}
          </Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* TITLE */}
        <Link
          to={`/posts/${posts[0].slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}
        </Link>
      </div>
      {/* OTHERS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* SECOND */}
        {posts[1] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[1].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[1].img}
                  className="rounded-3xl  object-cover size-full"
                  width={298}
                />
              </div>
            )}
            {/* DETAILS AND TITLE */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h2 className="font-semibold">02.</h2>
                <Link to="/" className="text-blue-800">
                  {posts[1].category}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[1].createdAt)}
                </span>
              </div>
              <Link
                to={`/posts/${posts[1].slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[1].title}
              </Link>
            </div>
          </div>
        )}
        {/* THIRD */}
        {posts[2] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[2].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[2].img}
                  className="rounded-3xl  object-cover size-full"
                  width={298}
                />
              </div>
            )}
            {/* DETAILS AND TITLE */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h2 className="font-semibold">03.</h2>
                <Link to="/" className="text-blue-800">
                  {posts[2].category}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[2].createdAt)}
                </span>
              </div>
              <Link
                to={`/posts/${posts[2].slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[2].title}
              </Link>
            </div>
          </div>
        )}
        {/* FORTH */}
        {posts[3] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[3].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[3].img}
                  className="rounded-3xl  object-cover size-full"
                  width={298}
                />
              </div>
            )}
            {/* DETAILS AND TITLE */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h2 className="font-semibold">04.</h2>
                <Link to="/" className="text-blue-800">
                  {posts[3].category}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[3].createdAt)}
                </span>
              </div>
              <Link
                to={`/posts/${posts[3].slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[3].title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
