import { api } from "./instance";
import type { ApiResponse } from "../types/api";
import type { GetPostsParams, PostListResponse } from "../types/post";

export async function getPosts({ keyword }: GetPostsParams) {
  const response = await api
    .get('posts', { searchParams: { keyword } })
    .json<ApiResponse<PostListResponse>>();

  return response.data;
}