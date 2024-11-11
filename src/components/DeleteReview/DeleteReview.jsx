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
