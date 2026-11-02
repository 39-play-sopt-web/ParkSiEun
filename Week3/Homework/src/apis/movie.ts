import apiClient from './apiClient';
import type { MovieListResponse, MovieDetail } from '../types/movie';

interface GetMoviesParams {
  page: number;
  minRating?: number;
  maxRating?: number;
}

// 영화 목록 조회
export const getMovies = async ({
  page,
  minRating,
  maxRating,
}: GetMoviesParams) => {
  const res = await apiClient.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      'vote_average.gte': minRating,
      'vote_average.lte': maxRating,
    },
  });
  return res.data;
};

// 영화 상세 조회
export const getMovieDetail = async (movieId: string) => {
  const res = await apiClient.get<MovieDetail>(`/movie/${movieId}`);
  return res.data;
};
