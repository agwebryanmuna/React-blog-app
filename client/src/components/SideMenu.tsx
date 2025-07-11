import type React from "react";
import Search from "./commons/Search";
import { useSearchParams } from "react-router";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            onChange={handleFilterChange}
            name="sort"
            value={"newest"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Newest
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            onChange={handleFilterChange}
            name="sort"
            value={"popular"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Most Popular
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            onChange={handleFilterChange}
            name="sort"
            value={"trending"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            onChange={handleFilterChange}
            name="sort"
            value={"oldest"}
            className=" appearance-none size-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-4 text-sm">
        <span
          onClick={() => handleCategoryChange("general")}
          className="underline cursor-pointer"
        >
          All
        </span>
        <span
          onClick={() => handleCategoryChange("web-design")}
          className="underline cursor-pointer"
        >
          Web Design
        </span>
        <span
          onClick={() => handleCategoryChange("development")}
          className="underline cursor-pointer"
        >
          Development
        </span>
        <span
          onClick={() => handleCategoryChange("databses")}
          className="underline cursor-pointer"
        >
          Databses
        </span>
        <span
          onClick={() => handleCategoryChange("seo")}
          className="underline cursor-pointer"
        >
          Search Engines
        </span>
        <span
          onClick={() => handleCategoryChange("marketing")}
          className="underline cursor-pointer"
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
