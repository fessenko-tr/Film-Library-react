import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function Movie({ link, name, id }) {
  const { pathname, search } = useLocation();
  return (
    <li>
      <Link to={link + id} state={{ from: pathname + search }}>
        {name}
      </Link>
    </li>
  );
}

export default Movie;

Movie.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
