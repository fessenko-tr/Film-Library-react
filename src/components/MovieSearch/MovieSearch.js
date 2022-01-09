import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import useForm from "../../hooks/useForm";

function MovieSearch() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [status, setStatus, { PENDING, RESOLVED, REJECTED, IDLE }] =
    useStatus();
  const [userInput, handleChange, handleSubmit] = useForm();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(PENDING);
    TMDBFetcher.fetchByQuery(query)
      .then((movies) => {
        setMovies(movies.data.results);
        setStatus(RESOLVED);
      })
      .catch(() => {
        setStatus(REJECTED);
      });
  }, [query]);

  const searchResults = movies?.map((movies) => (
    <li key={movies.id}>
      <Link to={String(movies.id)}>
        <p> {movies.title}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="search" value={userInput} />
        <button type="submit">Search</button>
      </form>
      {status === IDLE && <p>The best movie is waiting to be found</p>}
      {status === PENDING && <p>Your request is being processed</p>}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && searchResults.length !== 0 && (
        <ul>{searchResults}</ul>
      )}
      {status === RESOLVED && searchResults.length === 0 && (
        <p>Nothing is found</p>
      )}
    </>
  );
}

export default MovieSearch;
