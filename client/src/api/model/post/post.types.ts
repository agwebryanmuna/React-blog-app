export interface PostType {
  user: string;
  img?: string;
  title: string;
  slug: string;
  content: string;
  isFeatured?: boolean;
  visit?: number;
}
