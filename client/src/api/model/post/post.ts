import { BASE_URL } from "../../config/server";
import { FetchMethods } from "../../global.type";
import type { PostType, PostTypeRequest } from "./post.types";

class Post {
  // Get all posts
  async getPosts(
    page: number,
    limit: number,
    searchParams: URLSearchParams
  ): Promise<{ posts: PostType[]; hasMore: Boolean }> {
    const searchParamsObj = new URLSearchParams(
     Object.fromEntries([...searchParams])
    ).toString();

    const res = await fetch(
      `${BASE_URL}/posts?page=${page}&limit=${limit}&${searchParamsObj}`
    );
    const { posts, hasMore } = await res.json();

    return { posts, hasMore };
  }

  // Get all posts
  async getFeaturedPosts(
    limit: number,
  ): Promise<{ posts: PostType[]; hasMore: Boolean }> {


    const res = await fetch(
      `${BASE_URL}/posts?featured=true&limit=${limit}&sort=newest`
    );
    const { posts, hasMore } = await res.json();

    return { posts, hasMore };
  }

  // get single post
  async getSinglePost(slug: string): Promise<{ post: PostType }> {
    const res = await fetch(`${BASE_URL}/posts/${slug}`);
    const { post } = await res.json();

    return { post };
  }

  // create post
  async createPost(
    post: PostTypeRequest,
    token: string | null
  ): Promise<{ newPost: PostType }> {
    const res = await fetch(`${BASE_URL}/posts/`, {
      method: FetchMethods.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    const { newPost } = await res.json();

    return { newPost };
  }

  // get saved posts
  async getSavedPosts(token: string): Promise<{ savedPosts: [string] }> {
    const res = await fetch(`${BASE_URL}/users/saved`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { savedPosts } = await res.json();
    return { savedPosts };
  }

  // save post
  async toggleSavePost(
    token: string | null,
    postId: string
  ): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/users/save`, {
      method: FetchMethods.PATCH,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });
    const { message } = await res.json();

    return { message };
  }

  // delete post
  async deletePost(
    token: string | null,
    postId: string, slug:string
  ): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: FetchMethods.DELETE,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({slug})
    });
    const { message } = await res.json();

    return { message };
  }

  // FEATURE POST
  async featurePost(
    token: string | null,
    postId: string
  ): Promise<{ updatedPost: PostType }> {
    const res = await fetch(`${BASE_URL}/posts/feature`, {
      method: FetchMethods.PATCH,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });
    const { updatedPost } = await res.json();

    return { updatedPost };
  }
}

export const postAPI = new Post();
