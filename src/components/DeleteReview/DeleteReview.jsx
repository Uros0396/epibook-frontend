{
  /*import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ReviewsContext from "../ReviewsContext/ReviewsContext";
import "./DeleteReview.css";

const DeleteReview = ({ id }) => {
  const { setReviewToReload, reviewToReload } = useContext(ReviewsContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4500/books/${bookId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        console.error("Errore durante la cancellazione del commento");
        return;
      }

      setReviewToReload(!reviewToReload);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  };

  return (
    <Button className="ms-5" variant="btn-outline-light" onClick={handleDelete}>
      Delete Review
    </Button>
  );
};

export default DeleteReview;*/
}

// DeleteReview.jsx
import React, { useContext } from "react";
import { PostReviewsContext } from "../PostReviewsContext/PostReviewsContext";

const DeleteReview = ({ reviewId }) => {
  const { setReviewToReload } = useContext(PostReviewsContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/comments/${reviewId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Error deleting comment");
      setReviewToReload((prev) => !prev);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteReview;
