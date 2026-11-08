import { api } from "./instance";
import type { ApiResponse } from "../types/api";
import type { GetPostsParams, PostListResponse, CreatePostRequest, Post } from "../types/post";

export async function getPosts({ keyword }: GetPostsParams) {
  const response = await api
    .get('posts', { searchParams: { keyword } })
    .json<ApiResponse<PostListResponse>>();

  return response.data;
}

export async function createPost(body: CreatePostRequest) {
  const response = await api
    .post('posts', { json: body })
    .json<ApiResponse<Post>>();

  return response.data;
}

export async function getPostDetail(postId: number) {
  const response = await api
    .get(`posts/${postId}`)
    .json<ApiResponse<Post>>();

  return response.data;
}