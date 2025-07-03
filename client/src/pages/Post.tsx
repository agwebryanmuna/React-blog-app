import { Link, useNavigate, useParams } from "react-router";
import purify from "dompurify";
import parse from "html-react-parser";
import Image from "../components/commons/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/commons/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import Loader from "../components/commons/Loader";
import { format } from "timeago.js";

const Post = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => postAPI.getSinglePost(slug || ""),
  });

  if (isPending) return <Loader />;

  if (error) {
    console.log(error);

    return (
      <div>
        Something went wrong! See other{" "}
        <Link to={"/posts/"} className="text-blue-600">
          posts
        </Link>
      </div>
    );
  }

  if (!data?.post) {
    return (
      <div>
        Post does not exist! See other{" "}
        <Link to={"/posts/"} className="text-blue-600">
          posts
        </Link>
      </div>
    );
  }

  const post = data?.post;

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {post?.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="">Written by</span>
            <Link to={"/test"} className="text-blue-500">
              {post?.user.username}
            </Link>
            <span>on</span>
            <Link to={"/test"} className="text-blue-500">
              {post?.category}
            </Link>
            <span>{format(post?.createdAt as string)}</span>
          </div>
          <p className="text-gray-500 font-medium">{post?.desc}</p>
        </div>
        <div className="hidden lg:block w-2/5">
          {post?.img && (
            <Image src={post.img} width={600} className="rounded-2xl" />
          )}
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify grow">
          {parse(purify.sanitize(post?.content as string))}
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8 max-w-sm">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {post?.user.img && (
                <Image
                  src={post.user.img}
                  className="size-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              )}
              <Link to={"/test"} className="text-blue-800">
                {post?.user.username}
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <Link to={"/test"}>
                <Image src="/facebook.svg" width={25} height={25} />
              </Link>
              <Link to={"/test"}>
                <Image src="/instagram.svg" width={25} height={25} />
              </Link>
            </div>
          </div>
          <PostMenuActions post={post} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to={"/tes"} className="underline">
              All
            </Link>
            <Link to={"/tes"} className="underline">
              Web Design
            </Link>
            <Link to={"/tes"} className="underline">
              Development
            </Link>
            <Link to={"/tes"} className="underline">
              Databses
            </Link>
            <Link to={"/tes"} className="underline">
              Search Engines
            </Link>
            <Link to={"/tes"} className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={post._id} />
    </div>
  );
};

export default Post;
