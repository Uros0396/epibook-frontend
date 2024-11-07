import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [allBooks, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inputValue, setInputValue] = useState("");

  const getAllBooks = async (page, pageSize) => {
    try {
      const url = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/Books?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setBooks(result.books);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const searchBooksByTitle = async (title, page, pageSize) => {
    if (title.trim() === "") {
      getAllBooks(page, pageSize);
      return;
    }

    try {
      const url = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/books/search/${title}?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        setBooks(result.books);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    searchBooksByTitle(inputValue, page, pageSize);
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      getAllBooks(page, pageSize);
    }
  }, [page, pageSize]);

  return (
    <BookContext.Provider
      value={{
        allBooks,
        inputValue,
        handleInputChange,
        handleSubmitForm,
        page,
        setPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
