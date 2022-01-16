import Movie from "../Movie/";
import PropTypes from "prop-types";

function MovieList({ list, linkTo = "" }) {
  const movieList = list.map((movie) => (
    <Movie
      key={movie.id}
      id={movie.id}
      name={movie.title ?? movie.original_name}
      link={linkTo}
    />
  ));

  return <ul>{movieList}</ul>;
}

export default MovieList;

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkTo: PropTypes.string,
};
