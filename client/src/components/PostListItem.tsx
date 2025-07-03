import { format } from "timeago.js";
import type { PostType } from "../api/model/post/post.types";
import Image from "./commons/Image";
import { Link } from "react-router";

interface PostListItemProp {
  post: PostType;
}

const PostListItem = ({ post }: PostListItemProp) => {
  const postPath = `/posts/${post.slug}`;

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/2">
          <Image
            src={post.img}
            className="rounded-2xl object-cover"
            width={750}
          />
        </div>
      )}

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={postPath} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={postPath} className="text-blue-500">
            {post.user.username}
          </Link>
          <span>on</span>
          <Link to={postPath} className="text-blue-500">
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <p>{post.desc}</p>
        <Link to={postPath} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
