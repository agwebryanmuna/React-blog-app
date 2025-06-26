import Search from "./commons/Search";
import { Link } from "react-router";

const SideMenu = () => {
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value={"newest"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Newest
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value={"popular"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Most Popular
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value={"trending"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value={"oldest"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-4 text-sm">
        <Link to={"/posts"} className="underline">
          All
        </Link>
        <Link to={"/posts?cat=web-design"} className="underline">
          Web Design
        </Link>
        <Link to={"/posts?cat=development"} className="underline">
          Development
        </Link>
        <Link to={"/posts?cat=databses"} className="underline">
          Databses
        </Link>
        <Link to={"/posts?cat=engines"} className="underline">
          Search Engines
        </Link>
        <Link to={"/posts?cat=marketing"} className="underline">
          Marketing
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
