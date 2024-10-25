import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ReviewsContext from "../ReviewsContext/ReviewsContext";
import "./DeleteReview.css";
{
  /*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOWQ5Y2NiMjkxYzAwMTU4ZmZhNzYiLCJpYXQiOjE3MjY5MTM5NDgsImV4cCI6MTcyODEyMzU0OH0.J_kRGzLfLnx17wdw-29AEFnyzf_BotE8397dKj8gYyk*/
}
const DeleteReview = ({ id }) => {
  const { setReviewToReload, reviewToReload } = useContext(ReviewsContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAxNTFmNjBmMzg1MDAwMTUxYzE3OWMiLCJpYXQiOjE3MjgxMzk3NjYsImV4cCI6MTcyOTM0OTM2Nn0.dJG3wysAo1YXU2MXgdRsxVCki2TouKvypDxix9-28d0",
          },
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

export default DeleteReview;
