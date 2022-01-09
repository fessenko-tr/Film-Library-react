import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import s from "./MovieDetails.module.css";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
// const controller = new AbortController();

function MovieDetails({ id }) {
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();
  const [movieById, setMovieById] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(PENDING);
    TMDBFetcher.fetchById(id)
      .then((movie) => {
        setMovieById(movie.data);
        setStatus(RESOLVED);
      })
      .catch(() => {
        setStatus(REJECTED);
      });
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <button className={s.btn} onClick={goBack}>
        Go back
      </button>
      {status === PENDING && <p>Your request is being processed</p>}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && (
        <>
          <img
            width="300"
            height="400"
            alt={movieById.title}
            src={`https://image.tmdb.org/t/p/w500/${movieById.poster_path}`}
          />
          <h2>{`${movieById.title} (${movieById.release_date})`}</h2>
          <p>{`User Average Vote: ${movieById.vote_average}`}</p>
          <h3>Overview</h3>
          <p>{movieById.overview}</p>
          <h4>Genres</h4>
          <ul>
            {movieById.genres.map((el) => (
              <li key={el.id}>{el.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MovieDetails;
