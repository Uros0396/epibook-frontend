import React, { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleBook from "../SingleBook/SingleBook";
import CustomCard from "../CustomCard/CustomCard";
import CommentArea from "../CommentArea/CommentArea";
import InputBooks from "../InputBooks/InputBooks";
import "../MainSection/MainSezione.css";
import { DarkContext } from "../../contexts/DarkContext";
import { BookContext } from "../../contexts/BookContext";
import { SearchContext, useSearch } from "../SearchContext/SearchContext";

const MainSezione = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { isDarkMode } = useContext(DarkContext);
  const {
    allBooks: books,
    page,
    setPage,
    pageSize,
    inputValue,
    handleInputChange,
  } = useContext(BookContext);
  const { searchFantasyFilter, searchNavbarFilter } = useSearch();
  const [navbarFilteredBook, setNavbarFilteredBook] = useState(null);

  useEffect(() => {
    const navbarFilteredBooks = filteredBooks.filter(
      (book) =>
        !searchNavbarFilter ||
        book.title.toLowerCase().includes(searchNavbarFilter.toLowerCase())
    );
    setNavbarFilteredBook(navbarFilteredBooks ? navbarFilteredBooks[0] : null);
  }, [searchNavbarFilter]);

  // Randomizing the books array to display a "Book of the Day"
  const randomBook = useMemo(() => {
    if (Array.isArray(books) && books.length > 0) {
      return books.sort(() => Math.random() - 0.5);
    }
    return [];
  }, [books]);

  // Filtering the books based on the search term and category "fantasy"
  const filteredBooks = books.filter(
    (book) =>
      book.category === "fantasy" &&
      book.title.toLowerCase().includes(searchFantasyFilter.toLowerCase())
  );

  return (
    <div className={`${isDarkMode ? "bg-dark" : "bg-light"}`}>
      <Container className="mb-4 mt-4">
        <Row className="mt-4">
          <Col lg={6} className="d-flex flex-column align-items-center mt-5">
            <h2
              className={`single-book-title title-inputs-results text-center ${
                isDarkMode ? "text-white" : "text-dark"
              }`}
            >
              Book of the Day
            </h2>
            {randomBook.slice(0, 1).map((book) => (
              <SingleBook
                key={book?.asin}
                title={book?.title}
                price={
                  book?.price && book.price.$numberDecimal
                    ? parseFloat(book.price.$numberDecimal).toFixed(2)
                    : "No price"
                }
                img={book?.img}
                category={book?.category}
              />
            ))}
          </Col>

          <Col
            lg={6}
            className={`text-center mt-5 border ${
              isDarkMode ? "text-white" : "text-dark"
            }`}
          >
            <h3
              className={`title-inputs-results ${
                isDarkMode ? "text-dark" : ""
              }`}
            >
              Fantasy Library
            </h3>
            <InputBooks />
            {filteredBooks.map((book) => (
              <li key={book?.asin}>
                <img
                  src={book?.img}
                  alt={book?.title}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                <div className={`${isDarkMode ? "text-dark" : ""}`}>
                  {book?.title}
                </div>
              </li>
            ))}
          </Col>
        </Row>

        <Row className="d-flex flex-column gy-4 mt-5">
          {navbarFilteredBook && (
            <div>
              <h2>Your Book</h2>
              {
                <div key={navbarFilteredBook?._id}>
                  <img
                    src={navbarFilteredBook?.img}
                    alt={navbarFilteredBook?.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <div className={`${isDarkMode ? "text-dark" : ""}`}>
                    {navbarFilteredBook?.title}
                  </div>
                </div>
              }
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <Col lg={6}>
              <h2>
                <strong>Library</strong>
              </h2>
              <Row className="gy-4">
                {filteredBooks.map((book) => (
                  <Col xs={6} md={4} lg={6} key={book?.asin}>
                    <CustomCard
                      book={book}
                      selectedBook={selectedBook}
                      setSelectedBook={setSelectedBook}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col
              lg={6}
              className="right-column d-flex justify-content-center align-items-center"
            >
              {selectedBook ? (
                <CommentArea bookId={selectedBook ? selectedBook.asin : null} />
              ) : (
                <h4 className={`${isDarkMode ? "text-white" : "text-dark"}`}>
                  Select a book to see comments and details.
                </h4>
              )}
            </Col>
          </div>
        </Row>

        <Row>
          <Col>
            <Row className="mt-4">
              <Col className="d-flex justify-content-between">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span>Page {page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={books.length < pageSize}
                >
                  Next
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSezione;
