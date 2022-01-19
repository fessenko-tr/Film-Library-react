import Movie from "../Movie/";
import PropTypes from "prop-types";
import { Row } from "antd";

function MovieList({ list, linkTo = "" }) {
  const movieList = list.map((movie) => (
    <Movie
      key={movie.id}
      id={movie.id}
      name={movie.title || movie.original_name}
      link={linkTo}
      pic={movie.poster_path}
    />
  ));

  return <Row gutter={[66, 16]}>{movieList}</Row>;
}

export default MovieList;

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkTo: PropTypes.string,
};
