import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import { commentAPI } from "../api/model/comment/comment";
import { useAuth } from "@clerk/clerk-react";
import type { CommentTypeRequest } from "../api/model/comment/comment.types";
import { toast } from "react-toastify";
import { useState, type FormEvent } from "react";

interface CommentsProps {
  postId: string;
}

const Comments = ({ postId }: CommentsProps) => {
  const { getToken } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => commentAPI.getComments(postId || ""),
  });

  const [addingComment, setAddingComment] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const addNewComment = useMutation({
    mutationFn: async (newComment: CommentTypeRequest) => {
      const token = await getToken();
      return commentAPI.addComment(newComment, token, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setAddingComment(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setAddingComment(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingComment(true);

    const formData = new FormData(e.currentTarget);
    const desc = formData.get("desc");

    if (!desc) {
      toast.error("Please add a comment description");
      return;
    }

    const newComment: CommentTypeRequest = {
      desc: desc as string,
      post: postId,
    };
    addNewComment.mutate(newComment);
  };

  if (error) {
    console.log(error);
  }

  const comments = data?.comments;

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl bg-white"
        />
        <button
          type="submit"
          disabled={addingComment}
          className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {addingComment ? "Adding..." : "Send"}
        </button>
      </form>
      {comments &&
        comments.length > 0 &&
        !isPending &&
        comments?.map((comment) => <Comment key={comment._id} comment={comment} />)}
    </div>
  );
};

export default Comments;
