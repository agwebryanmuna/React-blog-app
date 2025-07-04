import { format } from "timeago.js";
import type { CommentType } from "../api/model/comment/comment.types";
import Image from "./commons/Image";
import { useAuth, useUser } from "@clerk/clerk-react";
import { commentAPI } from "../api/model/comment/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface CommentProps {
  comment: CommentType;
  postId: string;
}

const Comment = ({ comment, postId }: CommentProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const deleteComment = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return commentAPI.deleteComment(token, comment._id, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    deleteComment.mutate();
  };

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-4">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src={comment.user.img}
            className="size-10 rounded-full object-cover"
            width={40}
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user && (comment.user.username === user.username || isAdmin) && (
          <span
            className="text-xs hover:bg-red-400 cursor-pointer text-white bg-red-300 flex gap-2 uppercase items-center font-medium py-1 px-3 rounded-full"
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash"></i> delete
          </span>
        )}
        {deleteComment.isPending && <span>(In progress)</span>}
      </div>

      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
