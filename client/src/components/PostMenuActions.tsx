const PostMenuActions = () => {
  return (
    <div>
      <h1 className="mb-4 text-sm font-medium mt-8">Actions</h1>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <i className="fa-solid fa-bookmark"></i>
        <span>Save this post</span>
      </div>
      <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <i className="fa-solid fa-trash text-red-400"></i>
        <span>Delete this post</span>
      </div>
    </div>
  );
};

export default PostMenuActions;
