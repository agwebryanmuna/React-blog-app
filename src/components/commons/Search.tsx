const Search = () => {
  return (
    <div className=" bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <i className="fa-solid fa-magnifying-glass text-sm text-gray-500"></i>
      <input
        type="text"
        placeholder="search a post..."
        className="bg-transparent"
      />
    </div>
  );
};

export default Search;
