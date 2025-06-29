import { BASE_URL } from "../../config/server";
import type { FetchMethod } from "../../global.type";
import type { PostType } from "./post.types";

class Post {
  private createUrl(params?: string) {
    const url = params ? `${BASE_URL}/posts/${params}` : `${BASE_URL}/posts/`;
    return url;
  }

  private async fetchData<T>(
    url: string,
    method?: FetchMethod,
    post?: PostType,
    token?: string | null
  ): Promise<T> {
    let response;
    if (!token) {
      response = await fetch(url, {
        method: method ? method : "GET",
        body: post ? JSON.stringify(post) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch(url, {
        method: method ? method : "GET",
        body: post ? JSON.stringify(post) : undefined,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
    if (!response.ok) throw new Error(`${response.statusText}`);

    return response.json();
  }

  // Get all posts
  async getPosts(): Promise<PostType[]> {
    const url = this.createUrl();

    return this.fetchData<PostType[]>(url);
  }

  // get single post
  async getSinglePost(slug: string): Promise<PostType> {
    const url = this.createUrl(slug);

    return this.fetchData<PostType>(url);
  }

  // create post
  async createPost(post: PostType, token: string | null): Promise<PostType> {
    const url = this.createUrl();

    return this.fetchData<PostType>(url, "POST", post, token);
  }

  // delete post
  async deletePost(postId: string): Promise<string> {
    const url = this.createUrl(postId);
    return this.fetchData<string>(url, "DELETE");
  }
}

export const postAPI = new Post();
