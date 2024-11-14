import React, { useContext, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleBook from "../SingleBook/SingleBook";
import CustomCard from "../CustomCard/CustomCard";
import CommentArea from "../CommentArea/CommentArea";
import InputBooks from "../InputBooks/InputBooks";
import "../MainSection/MainSection.css";
import { DarkContext } from "../../contexts/DarkContext";
import { BookContext } from "../../contexts/BookContext";
import { useSearch } from "../SearchContext/SearchContext";

const MainSection = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { isDarkMode } = useContext(DarkContext);
  const { allBooks: books, page, setPage, pageSize } = useContext(BookContext);
  const { searchFantasyFilter, searchNavbarFilter } = useSearch();
  const [navbarFilteredBooks, setNavbarFilteredBook] = useState(null);

  useEffect(() => {
    const navbarFilteredBooks = books.filter(
      (book) =>
        !searchNavbarFilter ||
        book.title.toLowerCase().includes(searchNavbarFilter.toLowerCase())
    );
    setNavbarFilteredBook(navbarFilteredBooks[0] || null);
  }, [searchNavbarFilter, books]);

  const randomBook = useMemo(() => {
    return Array.isArray(books) && books.length > 0
      ? books[Math.floor(Math.random() * books.length)]
      : null;
  }, [books]);

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
              className={`single-book-title mt-2 ${
                isDarkMode ? "text-white" : "text-dark"
              }`}
            >
              Book of the Day
            </h2>
            {randomBook && (
              <SingleBook
                key={randomBook.asin}
                title={randomBook.title}
                price={parseFloat(
                  randomBook.price?.$numberDecimal || 0
                ).toFixed(2)}
                img={randomBook.img}
                category={randomBook.category}
              />
            )}
          </Col>

          <Col
            lg={6}
            className={`text-center mt-5 ${
              isDarkMode ? "text-white" : "text-dark"
            }`}
          >
            <h3>Fantasy Library</h3>
            <InputBooks />
            <ul>
              {filteredBooks.map((book) => (
                <li key={book.asin}>
                  <img
                    src={book.img}
                    alt={book.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <div>{book.title}</div>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        <Row className="mt-5 d-flex justify-content-between align-items-center">
          <Col lg={6} md={6} sm={12}>
            <h2>Library</h2>
            <Row className="gy-4">
              {filteredBooks.map((book) => (
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  key={book.asin}
                  className="d-flex justify-content-center align-items-center"
                >
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
            className="d-flex justify-content-center align-items-center"
          >
            {selectedBook ? (
              <CommentArea bookId={selectedBook._id} />
            ) : (
              <h4 className={`${isDarkMode ? "text-white" : "text-dark"}`}>
                Select a book to see comments and details.
              </h4>
            )}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-between mt-4">
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
      </Container>
    </div>
  );
};

export default MainSection;
