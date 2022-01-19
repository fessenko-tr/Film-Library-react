import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import useForm from "../../hooks/useForm";
import MovieList from "../MovieList/";
import { Button } from "antd";
import s from "./MovieSearch.module.css";
import { Spin } from "antd";

function MovieSearch() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [status, setStatus, { PENDING, RESOLVED, REJECTED, IDLE }] =
    useStatus();
  const [userInput, handleChange, onSubmit] = useForm();
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

  return (
    <div style={{ padding: "10px 20px" }}>
      <form className={s.Form} onSubmit={onSubmit}>
        <input onChange={handleChange} />
        <Button style={{ marginLeft: "10px" }} type="primary">
          Search
        </Button>
      </form>
      {status === IDLE && (
        <p className={s.Text}>The best movie is waiting to be found</p>
      )}
      {status === PENDING && <Spin className={s.Spinner} />}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && movies.length !== 0 && (
        <MovieList list={movies} />
      )}
      {status === RESOLVED && movies.length === 0 && (
        <p className={s.Text}>Nothing is found</p>
      )}
    </div>
  );
}

export default MovieSearch;
