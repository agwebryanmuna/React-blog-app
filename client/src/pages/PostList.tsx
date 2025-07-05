import React, { useState } from "react";

const PostList = React.lazy(() => import("../components/PostList"));
const SideMenu = React.lazy(() => import("../components/SideMenu"));

const PostsList = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" bg-blue-800 text-white rounded-2xl px-4 py-2 mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostsList;
