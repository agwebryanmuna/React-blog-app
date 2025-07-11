import { Link } from "react-router";
import Search from "./commons/Search";

const MainCategories = () => {
  return (
    <div className="hhidden md:flex rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* LINKS */}
      <div className="flex-1 flex items-center flex-wrap">
        <Link
          to={"/posts"}
          className=" bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to={"/posts?cat=web-design"}
          className=" hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Web Design
        </Link>
        <Link
          to={"/posts?cat=development"}
          className=" hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Development
        </Link>
        <Link
          to={"/posts?cat=databases"}
          className=" hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Databases
        </Link>
        <Link
          to={"/posts?cat=seo"}
          className=" hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Search Engines
        </Link>
        <Link
          to={"/posts?cat=marketing"}
          className=" hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Marketing
        </Link>
      </div>
      <span className=" text-xl font-medium max-md:hidden">|</span>
      {/* SEARCH */}
      <Search />
    </div>
  );
};

export default MainCategories;
