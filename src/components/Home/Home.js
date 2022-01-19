import { useState, useEffect } from "react";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import MovieList from "../MovieList/";
import s from "./Home.module.css";
import { Spin } from "antd";

function Home() {
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();
  const [trending, setTrending] = useState(null);
  const { HomeContainer, HomeHeader } = s;
  useEffect(() => {
    setStatus(PENDING);
    TMDBFetcher.fetchTending()
      .then((res) => {
        setTrending(res.data.results);
        setStatus(RESOLVED);
      })
      .catch(() => {
        setStatus(REJECTED);
      });
  }, []);

  return (
    <div className={HomeContainer}>
      <h1 className={HomeHeader}>Trending today</h1>
      {status === PENDING && <Spin />}
      {status === REJECTED && <p>Something went wrong sorry</p>}
      {status === RESOLVED && <MovieList list={trending} linkTo="/movies/" />}
    </div>
  );
}

export default Home;
