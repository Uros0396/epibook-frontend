{
  /*import { useState } from "react";
import AddBookCard from "./AddBookCard";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("img", fileToUpload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload/cloud`,
        {
          method: "POST",
          body: fileData,
        }
      );
      const dataImg = await response.json();
      return dataImg.img;
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitBook = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const postFormData = {
          ...formData,
          img: uploadedFile,
        };
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormData),
          }
        );

        const createdBook = await response.json();

        setBooks(createdBook.book);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <h2>Loading Book</h2>
      <form encType="multipart/form-data" onSubmit={submitBook}>
        <input
          className="form-control"
          name="asin"
          type="text"
          placeholder="Insert asin"
          onChange={handleInputChange}
        />
        <input
          className="form-control"
          name="price"
          type="text"
          placeholder="Insert price"
          onChange={handleInputChange}
        />
        <input
          className="form-control"
          name="category"
          type="text"
          placeholder="Insert category"
          onChange={handleInputChange}
        />
        <input
          className="form-control"
          name="title"
          type="text"
          placeholder="Insert title"
          onChange={handleInputChange}
        />
        <input
          className="form-control"
          name="img"
          type="file"
          placeholder="Insert img"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>

      <div className="book-list">
        {books &&
          books.map((book) => <AddBookCard key={book.asin} newBook={book} />)}
      </div>
    </>
  );
};

export default AddBook;*/
}

import { useState } from "react";
import AddBookCard from "./AddBookCard";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("img", fileToUpload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload/cloud`,
        {
          method: "POST",
          body: fileData,
        }
      );
      if (!response.ok) throw new Error("File upload failed");
      const dataImg = await response.json();
      return dataImg.img;
    } catch (error) {
      setError(error.message);
      console.error("File upload error:", error.message);
      return null;
    }
  };

  const submitBook = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let uploadedFileUrl = null;
      if (file) {
        uploadedFileUrl = await uploadFile(file);
        if (!uploadedFileUrl) return;
      }

      const postFormData = {
        ...formData,
        img: uploadedFileUrl,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postFormData),
        }
      );

      if (!response.ok) throw new Error("Failed to create book");
      const createdBook = await response.json();

      setBooks((prevBooks) => [...prevBooks, createdBook.book]);
      setFormData({});
      setFile(null);
    } catch (error) {
      setError(error.message);
      console.error("Book creation error:", error.message);
    }
  };

  return (
    <>
      <h2>Add a New Book</h2>
      {error && <p className="text-danger">{error}</p>}
      <form encType="multipart/form-data" onSubmit={submitBook}>
        <input
          className="form-control"
          name="asin"
          type="text"
          placeholder="Insert ASIN"
          value={formData.asin || ""}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-control"
          name="price"
          type="text"
          placeholder="Insert Price"
          value={formData.price || ""}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-control"
          name="category"
          type="text"
          placeholder="Insert Category"
          value={formData.category || ""}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-control"
          name="title"
          type="text"
          placeholder="Insert Title"
          value={formData.title || ""}
          onChange={handleInputChange}
          required
        />
        <input
          className="form-control"
          name="img"
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>

      <div className="book-list mt-4">
        {books.length > 0 ? (
          books.map((book) => <AddBookCard key={book.asin} newBook={book} />)
        ) : (
          <p>No books added yet.</p>
        )}
      </div>
    </>
  );
};

export default AddBook;
