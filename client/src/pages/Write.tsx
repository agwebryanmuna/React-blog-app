import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";

import type { PostTypeRequest } from "../api/model/post/post.types";
import { useEffect, useState, type FormEvent } from "react";
import UploadImage from "../components/UploadImage";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import { toast } from "react-toastify";

const Write = () => {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState<ReactQuill.Value>("");
  const [cover, setCover] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [contentImage, setContentImage] = useState<string>("");

  const navigate = useNavigate();

  if (!isLoaded) return <div className="">Loading...</div>;

  if (isLoaded && !isSignedIn) return <div>You should login!</div>;

  const createNewPost = useMutation({
    mutationFn: async (newPost: PostTypeRequest) => {
      const token = await getToken();
      return postAPI.createPost(newPost, token);
    },
    onSuccess: ({ newPost }) => {
      toast.success("Post has been created successfully!");

      // navigate user to post page
      navigate(`/posts/${newPost.slug}`);
      setValue("");
      setCover("");
      setContentImage("");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const category = formData.get("category");
    const desc = formData.get("desc");

    if (!value || !title) {
      toast.error("Please add a content and a title.");
      return;
    }

    const newPost: PostTypeRequest = {
      title: title as string,
      category: category as string,
      desc: desc as string,
      content: value as string,
      img: cover ? cover : undefined,
    };
    createNewPost.mutate(newPost);
  };

  useEffect(() => {
    contentImage &&
      setValue((prev) => prev + `<p><img src=${contentImage} /></p>`);
  }, [contentImage]);

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-clip font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <UploadImage setData={setCover} setProgress={setProgress}>
          <label className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            {cover ? "Change cover image" : "Add a cover image"}
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
          <UploadImage setData={setContentImage} setProgress={setProgress}>
            <label>
              <i className="fa-solid fa-image"></i>
            </label>
          </UploadImage>

          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={createNewPost.isPending || (0 < progress && progress < 100)}
          className={
            "bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          }
        >
          {createNewPost.isPending || (0 < progress && progress < 100)
            ? "Creating..."
            : "Send"}
        </button>
        {createNewPost.isError && <span>{createNewPost.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
