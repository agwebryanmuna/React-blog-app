import { useLocation, useNavigate, useSearchParams } from "react-router";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setsSearchParams] = useSearchParams();

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (!e.target.value) return;
      const query = e.target.value;
      if (location.pathname === "/posts") {
        setsSearchParams({
          ...Object.fromEntries(searchParams),
          search: query,
        });
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  };

  return (
    <div className=" bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <i className="fa-solid fa-magnifying-glass text-sm text-gray-500"></i>
      <input
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="search a post..."
        className="bg-transparent outline-0"
      />
    </div>
  );
};

export default Search;
