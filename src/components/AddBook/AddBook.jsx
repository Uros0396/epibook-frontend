{
  /*import { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
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
          img: uploadedFile.img,
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
        setNewBook(postFormData);
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
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
          img: uploadedFile.img,
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

        if (response.ok) {
          setBooks((prevBooks) => [...prevBooks, postFormData]);
          setNewBook(postFormData);
        }
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
        {books.map((book) => (
          <AddBookCard key={book.asin} newBook={book} />
        ))}
      </div>
    </>
  );
};

export default AddBook;
