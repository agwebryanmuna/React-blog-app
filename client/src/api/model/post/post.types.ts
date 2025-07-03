export interface PostTypeRequest {
  img?: string;
  title: string;
  content: string;
  desc?: string;
  category?: string;
  isFeatured?: boolean;
  visit?: number;
}

export interface PostType {
      _id: string;
      user: {_id:string, username:string, img?:string};
      img: string;
      title: string;
      slug: string;
      content: string;
      desc: string;
      category: string;
      isFeatured: boolean;
      visit: number;
      createdAt: string;
      updatedAt:string;
}
