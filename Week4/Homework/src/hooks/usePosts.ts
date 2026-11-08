import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../apis/posts";
import { QUERY_KEYS } from "../constants/queryKeys";

export function usePostList(keyword: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POST_LIST, keyword],
    queryFn: () => getPosts({ keyword: keyword || undefined }),
  });
}