import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Col, Card } from "antd";
function Movie({ link, name, id, pic }) {
  const { pathname, search } = useLocation();
  const { Meta } = Card;
  const randomPlaceHolder = "https://picsum.photos/200/300";
  return (
    <Col sm={24} md={12} xl={8}>
      <Link to={link + id} state={{ from: pathname + search }}>
        <Card
          hoverable
          cover={
            <img
              alt={name}
              src={
                pic
                  ? `https://image.tmdb.org/t/p/w500/${pic}`
                  : randomPlaceHolder
              }
            />
          }
        >
          <Meta title={name} />
        </Card>
      </Link>
    </Col>
  );
}

export default Movie;

Movie.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
