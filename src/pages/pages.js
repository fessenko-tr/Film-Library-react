import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const MainPage = lazy(() => import("./MainPage"));
const DetailedMoviePage = lazy(() => import("./DetailedMoviePage"));
const MoviesPage = lazy(() => import("./MoviesPage"));

function MainPages() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movies/" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<DetailedMoviePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default MainPages;
