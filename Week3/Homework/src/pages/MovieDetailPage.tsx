import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMovieDetail } from '../apis/movie';
import type { MovieDetail } from '../types/movie';
import {
  formatDate,
  formatRuntime,
  formatMoney,
  formatLanguage,
} from '../utils/format';

const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const data = await getMovieDetail(movieId);
        setMovie(data);
      } catch (error) {
        console.error('상세 정보를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <Loading>불러오는 중...</Loading>;

  const infoList = [
    { label: '원제', value: movie.original_title },
    { label: '원어', value: formatLanguage(movie.original_language) },
    {
      label: '제작 국가',
      value:
        movie.production_countries.map((country) => country.name).join(', ') ||
        '정보 없음',
    },
    {
      label: '사용 언어',
      value:
        movie.spoken_languages.map((lang) => lang.english_name).join(', ') ||
        '정보 없음',
    },
    { label: '예산', value: formatMoney(movie.budget) },
    { label: '수익', value: formatMoney(movie.revenue) },
  ];

  return (
    <Container>
      <BackLink to="/">← 영화 목록으로 돌아가기</BackLink>

      <Banner
        backdropUrl={
          movie.backdrop_path ? `${BACKDROP_URL}${movie.backdrop_path}` : null
        }
      >
        {movie.poster_path && (
          <Poster src={`${POSTER_URL}${movie.poster_path}`} alt={movie.title} />
        )}
        <BannerInfo>
          <Title>{movie.title}</Title>
          <MetaRow>
            <RatingBadge>★ {movie.vote_average.toFixed(1)}</RatingBadge>
            <span>{formatDate(movie.release_date)}</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>투표 {movie.vote_count.toLocaleString()}명</span>
            <StatusBadge>{movie.status}</StatusBadge>
          </MetaRow>
          <GenreList>
            {movie.genres.map((genre) => (
              <GenreChip key={genre.id}>{genre.name}</GenreChip>
            ))}
          </GenreList>
        </BannerInfo>
      </Banner>

      <Section>
        <SectionTitle>줄거리</SectionTitle>
        <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
      </Section>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <InfoGrid>
          {infoList.map((info) => (
            <InfoBox key={info.label}>
              <InfoLabel>{info.label}</InfoLabel>
              <InfoValue>{info.value}</InfoValue>
            </InfoBox>
          ))}
        </InfoGrid>
      </Section>
    </Container>
  );
};

export default MovieDetailPage;

const Loading = styled.p`
  padding: 80px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtext};
`;

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 20px 80px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.subtext};
  }
`;

const Banner = styled.section<{ backdropUrl: string | null }>`
  display: flex;
  gap: 32px;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  background-image: ${({ backdropUrl, theme }) =>
    backdropUrl
      ? `linear-gradient(to right, ${theme.colors.background}f7 40%, ${theme.colors.background}b3), url(${backdropUrl})`
      : 'none'};
  background-size: cover;
  background-position: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Poster = styled.img`
  width: 200px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(74, 58, 48, 0.15);
`;

const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
`;

const RatingBadge = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StatusBadge = styled.span`
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.subtext};
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GenreChip = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => `${theme.colors.primary}1f`};
`;

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 1.1rem;
`;

const Overview = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`;

const InfoBox = styled.div`
  padding: 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const InfoLabel = styled.p`
  margin-bottom: 6px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.subtext};
`;

const InfoValue = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;
