import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import s from "./MovieDetails.module.css";

function MovieDetails({ id }) {
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();
  const [movieById, setMovieById] = useState(null);
  const randomPlaceHolder = "https://picsum.photos/200/300";

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

  return (
    <>
      {status === PENDING && <p>Your request is being processed</p>}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && (
        <div className={s.Container}>
          <img
            width="300"
            height="400"
            alt={movieById.title}
            src={
              movieById.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieById.poster_path}`
                : randomPlaceHolder
            }
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
        </div>
      )}
    </>
  );
}

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MovieDetails;
