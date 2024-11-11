import React, { useContext, useEffect, useState } from "react";
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

export default CommentArea;
