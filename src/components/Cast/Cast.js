import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";
import { Col, Card, Row, Spin } from "antd";

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
    <Col key={actor.id} xs={24} sm={12} md={8} xl={{ span: 6 }}>
      <Card
        hoverable
        cover={
          <img
            width="150"
            height="200"
            alt={actor.name}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : "https://picsum.photos/200/300"
            }
          />
        }
      >
        {/* <Card.Meta
          title={actor.name}
          description={`Character: ${actor.character}`}
        /> */}
        <p>{actor.name}</p>
        <p>{`Character: ${actor.character}`}</p>
      </Card>
    </Col>
  ));

  return (
    <>
      {status === PENDING && <Spin />}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && castList.length !== 0 && (
        <Row gutter={[60, 30]}>{castList}</Row>
      )}
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
