import { useMutation } from "@tanstack/react-query";
import type { PostTypeRequest } from "../api/model/post/post.types";
import { postAPI } from "../api/model/post/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useCreatePost = ( token:string) => {
  const navigate = useNavigate()
  return useMutation({
      mutationFn: async (newPost:PostTypeRequest) => {
        return postAPI.createPost(newPost, token);
      },
      onSuccess: (newPost) => {
        toast.success("Post has been created successfully!");
        const createdPost = newPost["_doc"];
  
        // navigate user to post page
        navigate(`/posts/${createdPost.slug}`);
      },
    });
}
