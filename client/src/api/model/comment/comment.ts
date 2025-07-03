import { BASE_URL } from "../../config/server";
import { FetchMethods } from "../../global.type";
import type { CommentType, CommentTypeRequest } from "./comment.types";

class comment {
  // Get all comments
  async getComments(postId: string): Promise<{ comments: CommentType[] }> {
    const res = await fetch(`${BASE_URL}/comments/${postId}`);
    const { comments } = await res.json();

    return { comments };
  }

  // create comment
  async addComment(
    comment: CommentTypeRequest,
    token: string | null,
    postId: string
  ): Promise<{ newComment: CommentType }> {
    const res = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: FetchMethods.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });
    const { newComment } = await res.json();

    return { newComment };
  }

  // delete comment
  async deleteComment(
    commentId: string,
    token: string
  ): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: FetchMethods.DELETE,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { message } = await res.json();

    return { message };
  }
}

export const commentAPI = new comment();
