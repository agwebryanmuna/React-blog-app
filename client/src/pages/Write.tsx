import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

import type { PostTypeRequest } from "../api/model/post/post.types";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import UploadImage from "../components/UploadImage";

const Write = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string>("");
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState<ReactQuill.Value>("");
  const [cover, setCover] = useState<string>("");
  const [contentImage, setContentImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  // Create a ref for the file input element to access its files easily
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const createNewPost = useCreatePost(token);

  if (!isLoaded) return <div className="">Loading...</div>;

  if (isLoaded && !isSignedIn) return <div>You should login!</div>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: PostTypeRequest = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      desc: formData.get("desc") as string,
      content: value as string,
    };
    createNewPost.mutate(data);
  };

  useEffect(() => {
    getToken().then((tk) => (tk ? setToken(tk) : null));
  }, []);

  // <p><img src=${contentImage.url} /></p>

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-clip font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <UploadImage
          setData={setCover}
          setProgress={setProgress}
          clerkToken={token}
        >
          <label className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </label>
        </UploadImage>

        <input
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
        <div className="flex flex-1 flex-col md:flex-row gap-2">
          <UploadImage
            setData={setCover}
            setProgress={setProgress}
            clerkToken={token}
          >
            <label>
              <i className="fa-solid fa-image"></i>
            </label>
          </UploadImage>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
          />
        </div>
        <button
          disabled={createNewPost.isPending}
          className={
            "bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          }
        >
          {createNewPost.isPending ? "Creating..." : "Send"}
        </button>
        {createNewPost.isError && <span>{createNewPost.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
