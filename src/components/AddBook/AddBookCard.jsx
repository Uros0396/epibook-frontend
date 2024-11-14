import "./AddBookCard.css";

const AddBookCard = ({ newBook }) => {
  if (!newBook || !newBook.asin || !newBook.title) {
    return <p>Error: Book data is incomplete or missing.</p>;
  }

  return (
    <div className="card mt-4">
      <img
        src={newBook.img || "/default-image.jpg"}
        className="card-img-top"
        alt={newBook.title || "Book Image"}
      />
      <div className="card-body">
        <h5 className="card-title">{newBook.title}</h5>
        <p className="card-text">ASIN: {newBook.asin}</p>
        <p className="card-text">
          Category: {newBook.category || "Uncategorized"}
        </p>
        <p className="card-text">
          Price: $
          {typeof newBook.price === "number" ? newBook.price.toFixed(2) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AddBookCard;
