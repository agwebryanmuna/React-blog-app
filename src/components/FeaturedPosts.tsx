import Image from "./commons/Image";
import { Link } from "react-router";

const FeaturedPosts = () => {
  return (
    <div className=" mt-8 flex flex-col lg:flex-row gap-9">
      {/* FIRST POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* IMAGE */}
        <Image src="/featured1.jpeg" className="rounded-3xl object-cover" />
        {/* DETAILS */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="/" className="text-blue-800 lg:text-lg">
            Web Design
          </Link>
          <span className="text-gray-500">2 days ago</span>
        </div>

        {/* TITLE */}
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
      </div>
      {/* OTHERS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* SECOND */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/featured2.jpeg"
              className="rounded-3xl  object-cover size-full"
              width={298}
            />
          </div>
          {/* DETAILS AND TITLE */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base">
              <h2 className="font-semibold">02.</h2>
              <Link to="/" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </Link>
          </div>
        </div>
        {/* THIRD */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/featured2.jpeg"
              className="rounded-3xl  object-cover size-full"
              width={298}
            />
          </div>
          {/* DETAILS AND TITLE */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base">
              <h2 className="font-semibold">03.</h2>
              <Link to="/" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </Link>
          </div>
        </div>
        {/* FORTH */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/featured2.jpeg"
              className="rounded-3xl  object-cover size-full"
              width={298}
            />
          </div>
          {/* DETAILS AND TITLE */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base">
              <h2 className="font-semibold">04.</h2>
              <Link to="/" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
