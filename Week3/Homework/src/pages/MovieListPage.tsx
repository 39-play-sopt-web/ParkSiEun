import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMovies } from '../apis/movie';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import RatingFilter, { RATING_OPTIONS } from '../components/RatingFilter';
import type { RatingOption } from '../components/RatingFilter';

const MovieListPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedRating, setSelectedRating] = useState<RatingOption>(RATING_OPTIONS[0]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies({
                page: 1,
                minRating: selectedRating.min,
                maxRating: selectedRating.max,
            });
            setMovies(data.results);
        };
        fetchMovies();
    }, [selectedRating]);

    return (
    <Container>
      <Heading>🍿영화 둘러보기</Heading>
      <RatingFilter selected={selectedRating} onSelect={setSelectedRating} />
      <Grid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
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