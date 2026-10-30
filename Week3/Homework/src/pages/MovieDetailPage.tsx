import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const {movieId} = useParams();
    return <div>{movieId}번 영화 상세</div>;
};

export default MovieDetailPage;