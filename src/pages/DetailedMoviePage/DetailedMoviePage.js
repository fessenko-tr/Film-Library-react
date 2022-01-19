import MovieDetails from "../../components/MovieDetails/MovieDetails";
import { useParams, Link, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import s from "./DetailedMoviePage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Space } from "antd";

const Cast = lazy(() => import("../../components/Cast/"));
const Reviews = lazy(() => import("../../components/Reviews/"));

function DetailedMoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  function goBack() {
    if (state) {
      return navigate(state.from);
    }
    navigate("/");
  }

  return (
    <div className={s.Container}>
      <Button type="primary" onClick={goBack}>
        Go back
      </Button>
      <MovieDetails id={movieId} />
      <h5>Additional information</h5>

      <Space className={s.Space}>
        <Link className={s.link} to="cast" state={{ from: state?.from }}>
          <Button> Cast</Button>
        </Link>
        <Link className={s.link} to="review" state={{ from: state?.from }}>
          <Button> Reviews</Button>
        </Link>
      </Space>

      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="cast" element={<Cast id={movieId} />} />
          <Route path="review" element={<Reviews id={movieId} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default DetailedMoviePage;
