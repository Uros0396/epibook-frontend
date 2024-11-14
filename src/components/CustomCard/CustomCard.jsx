import { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "react-bootstrap";
import "./CustomCard.css";
import { useNavigate } from "react-router-dom";

const CustomCard = ({ book, selectedBook, setSelectedBook }) => {
  const navigate = useNavigate();

  const handleRedirecttoDetail = () => {
    navigate(`/Detail/${book?._id}`);
  };

  const [isClicked, setIsClicked] = useState(false);

  const clickOnCard = () => {
    setSelectedBook(book);
  };

  useEffect(() => {
    setIsClicked(selectedBook?._id === book?._id);
  }, [selectedBook, book?._id]);

  return (
    <Card
      className={`bookCard card-shadow gx-4 mb-2 scale-over text-center ${
        isClicked ? "border-danger" : ""
      }`}
      onClick={clickOnCard}
    >
      <CardImg
        variant="top"
        src={book?.img}
        alt={book?.title}
        className="object-fit-cover"
      />
      <CardBody>
        <CardTitle>{book?.title}</CardTitle>
        <CardText className="text-truncate">
          <strong>Category:</strong> {book?.category}
        </CardText>
        <CardText className="m-0">
          <strong>Price:</strong> {book?.price} €
        </CardText>
      </CardBody>
      <CardFooter className="p-0 m-0 card-footer">
        <Button
          onClick={handleRedirecttoDetail}
          className="btn btn-info p-0 m-0"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
