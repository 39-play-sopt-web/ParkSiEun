import { createBrowserRouter } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
    {path:"/", Component: MovieListPage },
    {path:"/movie/:movieId", Component: MovieDetailPage },
]);

export default router;