import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost } from "../apis/posts";
import { QUERY_KEYS } from "../constants/queryKeys";
import type { CreatePostRequest } from "../types/post";

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