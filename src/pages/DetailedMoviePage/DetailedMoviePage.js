import MovieDetails from "../../components/MovieDetails/MovieDetails";
import { useParams, Link, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import s from "./DetailedMoviePage.module.css";

const Cast = lazy(() => import("../../components/Cast/"));
const Reviews = lazy(() => import("../../components/Reviews/"));

function DetailedMoviePage() {
  const { movieId } = useParams();

  return (
    <>
      <MovieDetails id={movieId} />
      <h5>Additional information</h5>
      <Link className={s.link} to="cast">
        Cast
      </Link>
      <Link className={s.link} to="review">
        Reviews
      </Link>
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="cast" element={<Cast id={movieId} />} />
          <Route path="review" element={<Reviews id={movieId} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default DetailedMoviePage;
