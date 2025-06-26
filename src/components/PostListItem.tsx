import Image from "./commons/Image";
import { Link } from "react-router";

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/2">
        <Image
          src="/postImg.jpeg"
          className="rounded-2xl object-cover"
          width={750}
        />
      </div>

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={"/test"} className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          reiciendis?
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={"/test"} className="text-blue-500">
            John Doe
          </Link>
          <span>on</span>
          <Link to={"/test"} className="text-blue-500">
            Web Design
          </Link>
          <span>2 Days ago</span>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio nemo
          numquam amet ipsam nisi rerum aut ea, fugiat ipsa, earum officia,
          similique harum natus ab odio! Doloribus deleniti repudiandae
          doloremque!
        </p>
        <Link to={"/test"} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
