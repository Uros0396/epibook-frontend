import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import fantasy from "../books/fantasy.json";
import "./Detail.css";

const Detail = () => {
  const { asin } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  const getBookDetails = () => {
    const foundBook = fantasy.find((book) => book?.asin === asin);
    if (foundBook) {
      setBook(foundBook);
    } else {
      console.error("Book not found");
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAxNTFmNjBmMzg1MDAwMTUxYzE3OWMiLCJpYXQiOjE3MjgxMzk3NjYsImV4cCI6MTcyOTM0OTM2Nn0.dJG3wysAo1YXU2MXgdRsxVCki2TouKvypDxix9-28d0",
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookDetails();
    getComments();
  }, [asin]);

  if (loading) {
    return <p>Loading Comments...</p>;
  }

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
              <h4>{book?.title}</h4>
              <img src={book?.img} alt={book?.title} className="fixed-image" />
              <p>
                <b>Category:</b> {book?.category}
              </p>
              <p>
                <b>Price:</b> {book?.price} €
              </p>
            </div>
          ) : (
            <p>Book details not found</p>
          )}
        </Col>
        <Col lg={6} md={6} sm={12}>
          <h4>Comments with ASIN: {asin}</h4>
          <div className="comments-container mb-5">
            {comments.length > 0 ? (
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className={`"comment-item" ${
                      isDarkMode ? "text-primary" : "text-dark"
                    }`}
                  >
                    <p>
                      {comment.comment} - <b>{comment.rate}</b> stars
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Comments not found.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
