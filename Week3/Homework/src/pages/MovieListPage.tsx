import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { getMovies } from '../apis/movie';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import RatingFilter, { RATING_OPTIONS } from '../components/RatingFilter';
import type { RatingOption } from '../components/RatingFilter';

const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedRating, setSelectedRating] = useState<RatingOption>(
    RATING_OPTIONS[0],
  );
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSelectRating = (option: RatingOption) => {
    setSelectedRating(option);
    setMovies([]);
    setPage(1);
    setHasNext(true);
  };

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies({
          page,
          minRating: selectedRating.min,
          maxRating: selectedRating.max,
        });
        if (ignore) return;
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results],
        );
        setHasNext(page < data.total_pages);
      } catch (error) {
        console.error('영화 목록을 불러오는 데 실패했습니다.', error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchMovies();

    return () => {
      ignore = true;
    };
  }, [page, selectedRating]);

  useEffect(() => {
    const target = bottomRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNext &&
          !isLoading &&
          movies.length > 0
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNext, isLoading, movies.length]);

  return (
    <Container>
      <Heading>🍿영화 둘러보기</Heading>
      <RatingFilter selected={selectedRating} onSelect={handleSelectRating} />
      <Grid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      {isLoading && <Message>불러오는 중...</Message>}
      {!hasNext && <Message>마지막 영화예요 🎬</Message>}
      <div ref={bottomRef} />
    </Container>
  );
};

export default MovieListPage;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Heading = styled.h2`
  margin-bottom: 24px;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const Message = styled.p`
  padding: 24px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtext};
`;
