import MovieDetails from "../../components/MovieDetails/MovieDetails";
import { useParams, Link, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import s from "./DetailedMoviePage.module.css";
import { useNavigate, useLocation } from "react-router-dom";

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
    <>
      <button className={s.btn} onClick={goBack}>
        Go back
      </button>
      <MovieDetails id={movieId} />
      <h5>Additional information</h5>
      <Link className={s.link} to="cast" state={{ from: state?.from }}>
        Cast
      </Link>
      <Link className={s.link} to="review" state={{ from: state?.from }}>
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
