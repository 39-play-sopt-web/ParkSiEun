import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: MovieListPage },
      { path: 'movie/:movieId', Component: MovieDetailPage },
    ],
  },
]);

export default router;
