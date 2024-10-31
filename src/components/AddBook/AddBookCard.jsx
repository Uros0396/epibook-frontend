import "./AddBookCard.css";

const AddBookCard = ({ newBook }) => {
  return (
    newBook && (
      <div className="card mt-4">
        <img src={newBook.img} className="card-img-top" alt={newBook.title} />
        <div className="card-body">
          <h5 className="card-title">{newBook.title}</h5>
          <p className="card-text">ASIN: {newBook.asin}</p>
          <p className="card-text">Category: {newBook.category}</p>
          <p className="card-text">Price: ${newBook.price}</p>
        </div>
      </div>
    )
  );
};

export default AddBookCard;
