export interface PostType {
  _id?: string;
  user?: string;
  img?: string;
  title: string;
  slug?: string;
  content: string;
  desc?: string;
  category?: string;
  isFeatured?: boolean;
  visit?: number;
}
