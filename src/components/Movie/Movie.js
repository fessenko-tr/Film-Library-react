import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movie({ link, name, id }) {
  return (
    <li>
      <Link to={link + id}>{name}</Link>
    </li>
  );
}

export default Movie;

Movie.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
