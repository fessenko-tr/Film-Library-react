import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainPage = lazy(() => import("./pages/MainPage/"));
const DetailedMoviePage = lazy(() => import("./pages/DetailedMoviePage/"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/"));

function MainRoutes() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movies/" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<DetailedMoviePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
