import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";

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

  const trendingMovies = trending?.map((movie) => (
    <li key={movie.id}>
      <Link to={`/movies/${movie.id}`}>
        {movie.title || movie.original_name}
      </Link>
    </li>
  ));

  return (
    <>
      <h1>Trending today</h1>
      {status === PENDING && <p>Loading Trending Movies!...</p>}
      {status === REJECTED && <p>Something went wrong sorry</p>}
      {status === RESOLVED && <ul>{trendingMovies}</ul>}
    </>
  );
}

export default Home;
