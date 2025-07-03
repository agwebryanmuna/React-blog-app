export interface CommentType {
  _id: string;
  user: { _id: string; username: string; img?: string };
  post: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentTypeRequest {
  post: string;
  desc: string;
}
