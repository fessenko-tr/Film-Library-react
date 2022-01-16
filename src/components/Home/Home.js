import { useState, useEffect } from "react";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import MovieList from "../MovieList/";

function Home() {
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();
  const [trending, setTrending] = useState(null);

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
    <>
      <h1>Trending today</h1>
      {status === PENDING && <p>Loading Trending Movies!...</p>}
      {status === REJECTED && <p>Something went wrong sorry</p>}
      {status === RESOLVED && <MovieList list={trending} linkTo="/movies/" />}
    </>
  );
}

export default Home;
