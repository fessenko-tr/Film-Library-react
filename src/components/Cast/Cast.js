import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";

function Cast({ id }) {
  const [movieCast, setMovieCast] = useState(null);
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();

  useEffect(() => {
    setStatus(PENDING);
    TMDBFetcher.fetchCast(id)
      .then((movie) => {
        setMovieCast(movie.data.cast);
        setStatus(RESOLVED);
      })
      .catch(() => {
        setStatus(REJECTED);
      });
  }, []);

  const castList = movieCast?.map((actor) => (
    <li key={actor.id}>
      <img
        width="150"
        height="200"
        alt={actor.name}
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
      />
      <p>{actor.name}</p>
      <p>{`Character: ${actor.character}`}</p>
    </li>
  ));

  return (
    <>
      {status === PENDING && <p>Your request is being processed</p>}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && castList.length !== 0 && <ul>{castList}</ul>}
      {status === RESOLVED && castList.length === 0 && (
        <p>Cast seems to be unknown for this movie</p>
      )}
    </>
  );
}

Cast.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Cast;
