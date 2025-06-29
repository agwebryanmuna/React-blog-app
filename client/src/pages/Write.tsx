import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { postAPI } from "../api/model/post/post";
import { useMutation } from "@tanstack/react-query";
import type { PostType } from "../api/model/post/post.types";
import { useState, type FormEvent } from "react";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState<ReactQuill.Value>("");

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost: PostType) => {
      const token = await getToken();
      return postAPI.createPost(newPost, token);
    },
  });

  if (!isLoaded) return <div className="">Loading...</div>;

  if (isLoaded && !isSignedIn) return <div>You should login!</div>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Omit<PostType, "_id" | "user"> = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      desc: formData.get("desc") as string,
      content: value as string,
    };
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-clip font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
          Add a cover image
        </button>
        <input
          required
          name="title"
          className="text-4xl font-semibold bg-transparent outline-0"
          type="text"
          placeholder="My Awesome story"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="cat"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engine</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          id=""
          className="p-4 rounded-xl bg-white shadow-md"
          placeholder="A short Description"
        ></textarea>
        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={value}
          onChange={setValue}
        />
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36">
          Send
        </button>
      </form>
    </div>
  );
};

export default Write;
