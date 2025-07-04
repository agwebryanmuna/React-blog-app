import { useAuth, useUser } from "@clerk/clerk-react";
import type { PostType } from "../api/model/post/post.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postAPI } from "../api/model/post/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface PostMenuActionsProps {
  post: PostType;
}

const PostMenuActions = ({ post }: PostMenuActionsProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return postAPI.getSavedPosts(token as string);
    },
  });

  const toggleSavePost = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return postAPI.toggleSavePost(token, post._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const featurePost = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return postAPI.featurePost(token, post._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePost = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return postAPI.deletePost(token, post._id, post.slug);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:['posts']})
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleToggleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    toggleSavePost.mutate();
  };

  const handleDelete = () => {
    deletePost.mutate();
  };

  const handleFeature = () => {
    featurePost.mutate();
  };

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  const savedPosts = data?.savedPosts;
  const isSaved = savedPosts?.includes(post._id);

  return (
    <div>
      <h1 className="mb-4 text-sm font-medium mt-8">Actions</h1>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Saved posts fetching failed"
      ) : (
        <div
          onClick={handleToggleSave}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <i
            className={`
              ${
                toggleSavePost.isPending
                  ? isSaved
                    ? "fa-regular"
                    : "fa-solid"
                  : isSaved
                  ? "fa-solid"
                  : "fa-regular"
              }
               fa-bookmark`}
          ></i>
          <span>Save this post</span>
          {toggleSavePost.isPending && (
            <span className="text-xs">(In progress)</span>
          )}
        </div>
      )}
      {isAdmin && (
        <div
          onClick={handleFeature}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <i
            className={`
              ${
                featurePost.isPending
                  ? post.isFeatured
                    ? "fa-regular"
                    : "fa-solid"
                  : post.isFeatured
                  ? "fa-solid"
                  : "fa-regular"
              }
               fa-star`}
          ></i>
          <span>Feature this post</span>
          {featurePost.isPending && (
            <span className="text-xs">(In progress)</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          onClick={handleDelete}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        >
          <i className="fa-solid fa-trash text-red-400"></i>
          <span>Delete this post</span>
          {deletePost.isPending && (
            <span className="text-xs">In progress..</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;
