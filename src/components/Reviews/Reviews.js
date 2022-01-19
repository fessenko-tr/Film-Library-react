import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TMDBFetcher from "../../api/tmdbApi";
import useStatus from "../../hooks/useStatus";

function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus, { PENDING, RESOLVED, REJECTED }] = useStatus();

  useEffect(() => {
    setStatus(PENDING);
    TMDBFetcher.fetchReviews(id)
      .then((reviews) => {
        setReviews(reviews.data.results);
        setStatus(RESOLVED);
      })
      .catch(() => {
        setStatus(REJECTED);
      });
  }, []);

  const reviewsList = reviews?.map((review) => (
    <li key={review.id}>
      <h5>{`Author: ${review.author}`}</h5>
      <p>{review.content}</p>
    </li>
  ));

  return (
    <>
      {status === PENDING && <p>Your request is being processed</p>}
      {status === REJECTED && <p>Sorry, something went wrong, try again</p>}
      {status === RESOLVED && reviewsList.length !== 0 && (
        <ul>{reviewsList}</ul>
      )}
      {status === RESOLVED && reviewsList.length === 0 && (
        <p>There are no reviews</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Reviews;
