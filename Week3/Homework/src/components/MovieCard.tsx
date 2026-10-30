import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  movie: Movie;
}

const formatDate = (date: string) => {
  if (!date) return '개봉일 미정';
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const { id, title, poster_path, release_date, overview, vote_average } = movie;

  return (
    <Card to={`/movie/${id}`}>
      <PosterWrapper>
        {poster_path ? (
          <Poster src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} />
        ) : (
          <NoPoster>No Image</NoPoster>
        )}
        <Rating>★ {vote_average.toFixed(1)}</Rating>
      </PosterWrapper>
      <Info>
        <Title>{title}</Title>
        <ReleaseDate>{formatDate(release_date)}</ReleaseDate>
        <Overview>{overview || '줄거리 정보가 없습니다.'}</Overview>
      </Info>
    </Card>
  );
};

export default MovieCard;

const Card = styled(Link)`
  display: block;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoPoster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray};
`;

const Rating = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Info = styled.div`
  padding: 12px;
`;

const Title = styled.h3`
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReleaseDate = styled.p`
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Overview = styled.p`
  margin-top: 8px;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;