import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Detail = () => {
  const { bookId } = useParams(); // Prende l'ID del libro dai parametri URL

  const [book, setBook] = useState(null); // Stato per il singolo libro
  const [comments, setComments] = useState([]); // Stato per i commenti
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Stato per eventuali errori

  const getBookDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/book/${bookId}` // Includere l'ID del libro
      );
      console.log(bookId);

      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }

      const bookData = await response.json();
      console.log(bookData);

      setBook(bookData); // Assicurati che bookData sia un oggetto libro

      setComments(bookData.comments || []); // Assicurati che i commenti siano impostati correttamente
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(bookId);
    if (bookId) {
      getBookDetails();
    } else {
      setError("Book ID is required");
    }
  }, [bookId]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col
          lg={6}
          md={6}
          sm={12}
          className="d-flex flex-column align-items-center"
        >
          {book ? (
            <div className="text-center">
              <h4>{book.title}</h4>
              <img
                src={book.img}
                alt={book.title}
                className="fixed-image"
                height={400}
                width={300}
              />
              <p>
                <b>Category:</b> {book.category}
              </p>
              <p>
                <b>Price:</b> {book.price} €
              </p>
            </div>
          ) : (
            <p>Book details not found</p>
          )}
        </Col>
        <Col lg={6} md={6} sm={12}>
          <h4>Comments for id: {bookId}</h4>
          <div className="comments-container mb-5">
            {comments.length > 0 ? (
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li key={comment._id} className="comment-item">
                    <p>
                      {comment.comments} - <b>{comment.rate}</b> stars
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments found.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
