{
  /*import React, { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import DeleteReview from "../DeleteReview/DeleteReview";
import { PostReviewsContext } from "../PostReviewsContext/PostReviewsContext";
import "../CommentArea/CommentArea.css";

const CommentArea = ({ bookId }) => {
  const { setReviewToReload } = useContext(PostReviewsContext);
  const [reviews, setReviews] = useState([]);
  const [loading] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [showError, setShowError] = useState(false);
  const [commentIdToModify] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${bookId}`
        );
        if (!response.ok) throw new Error("Error loading reviews");
        console.log(response);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleAdd = async () => {
    if (!comment || rate < 1 || rate > 5) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const newReview = { book: bookId, comment, rate };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/comment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );

      if (!response.ok) throw new Error("Error adding comment");
      const addedReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, addedReview]);
      setReviewToReload((prev) => !prev);
      setComment("");
      setRate(1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <div className="comment-area">
      <div className="comment-list">
        <ul>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review._id}>
                {commentIdToModify === review._id ? (
                  <>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                    />
                    <Button onClick={() => handleModify(review._id)}>
                      Modify
                    </Button>
                  </>
                ) : (
                  <>
                    <p>{review.comment}</p>
                    <span>Rating: {review.rate}</span>
                    <DeleteReview reviewId={review._id} />
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </ul>
      </div>
      <textarea
        placeholder="Insert review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />
      {showError && (
        <p className="text-danger">Both review and rating are required!</p>
      )}
      <Button onClick={handleAdd}>Add Review</Button>
    </div>
  );
};

export default CommentArea;*/
}

import React, { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import "../CommentArea/CommentArea.css";
import DeleteReview from "../DeleteReview/DeleteReview";
import ReviewsContext from "../ReviewsContext/ReviewsContext";
import { PostReviewsContext } from "../PostReviewsContext/PostReviewsContext";
const CommentArea = ({ bookId }) => {
  const { setReviewToReload } = useContext(PostReviewsContext);
  const { reviewToReload } = useContext(ReviewsContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [showError, setShowError] = useState(false);
  const [commentToModify, setCommentToModify] = useState(null);
  const [commentIdToModify, setCommentIdToModify] = useState(null);
  const asin = bookId;
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/${bookId}/comments`
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleAdd = async () => {
    if (!comment || !rate || rate < 1 || rate > 5) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const commentData = {
      elementId: asin,
      comment: comment,
      rate: rate,
    };
    try {
      const response = await fetch(
        `http://localhost:4500/books/${bookId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      if (!response.ok) {
        throw new Error("cannot send");
      }
      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewToReload((prev) => !prev);
      setComment("");
      setRate(1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleModify = async (id) => {
    if (!comment || !rate || rate < 1 || rate > 5) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const commentData = {
      comment: comment,
      rate: rate,
    };
    try {
      const response = await fetch(
        `http://localhost:4500/books/${bookId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento");
      }
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === id ? { ...review, comment, rate } : review
        )
      );
      setReviewToReload((prev) => !prev);
      setComment("");
      setRate(1);
      setCommentToModify(null);
      setCommentIdToModify(null);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    if (asin) {
      getData();
    }
  }, [bookId]);
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (!reviews.length)
    return (
      <div className="no-review-bg d-flex justify-content-center align-items-center flex-column">
        <div>
          <p>
            <strong>
              <em>Be the first to add a review!</em>
            </strong>
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column">
            <div>
              <textarea
                placeholder="Insert review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rate (1-5)"
                value={rate}
                onChange={(e) => setRate(parseInt(e.target.value))}
              />
            </div>
            {showError && (
              <p className="text-danger">
                <strong>
                  <em>Both review and rating are necessary!</em>
                </strong>
              </p>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Button className="text-center ciao" onClick={handleAdd}>
            Add Review
          </Button>
        </div>
      </div>
    );
  return (
    <div
      className="comment-area"
      style={{
        backgroundImage: `url(${book?.img})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        position: "relative",
        height: "700px",
        width: "100%",
      }}
    >
      <div className="overlay d-flex flex-column justify-content-center align-items-center">
        <div className="mb-5">
          <div className="text-center">
            <h3>Comments for:</h3>
          </div>
          <div className="title-book text-center">{book?.title}</div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <ul className="list-unstyled">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                {commentIdToModify === review._id ? (
                  <>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rate}
                      onChange={(e) => setRate(parseInt(e.target.value))}
                    />
                    <Button
                      className="ms-2"
                      variant="btn btn-outline-light"
                      onClick={() => handleModify(review._id)}
                    >
                      Modify
                    </Button>
                    <Button onClick={() => setCommentIdToModify(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {review.author}: {review.comment} {review.rate} stars
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        className="modify-button ms-3"
                        variant="btn-outline-light"
                        onClick={() => {
                          setCommentToModify(review.comment);
                          setCommentIdToModify(review._id);
                          setRate(review.rate);
                        }}
                      >
                        Modify
                      </Button>
                      <DeleteReview />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column align-items-start">
            <textarea
              placeholder="Insert your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rate (1-5)"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
            />
            {showError && (
              <p className="text-danger">
                Both review and rating are necessary!
              </p>
            )}
          </div>
          <div className="mt-2">
            <Button onClick={handleAdd}>Add Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentArea;
