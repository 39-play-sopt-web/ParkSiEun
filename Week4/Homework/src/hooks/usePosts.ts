import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, getPostDetail, updatePost, deletePost } from "../apis/posts";
import { QUERY_KEYS } from "../constants/queryKeys";
import type { CreatePostRequest, UpdatePostRequest } from "../types/post";

export function usePostList(keyword: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POST_LIST, keyword],
    queryFn: () => getPosts({ keyword: keyword || undefined }),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePostRequest) => createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LIST });
    },
  });
}

export function usePostDetail(postId: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POST_DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
}

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdatePostRequest) => updatePost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LIST });
    },
  });
}