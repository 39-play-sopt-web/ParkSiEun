import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMovies } from '../apis/movie';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

const MovieListPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies({page: 1});
            setMovies(data.results);
        };
        fetchMovies();
    }, []);

    return (
    <Container>
      <Heading>🍿영화 둘러보기</Heading>
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