import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "react-bootstrap";
import "./SingleBook.css";

const SingleBook = ({ img, category, title, price }) => {
  return (
    <Col
      sm={12}
      className="d-flex justify-content-center align-items-center mt-2"
    >
      <Card className="custom-card text-center">
        {" "}
        <CardImg variant="top" className="object-fit-cover" src={img} />
        <CardBody>
          <CardTitle className="text-center card-title">{title}</CardTitle>
          <CardText className="text-center">
            Category
            {category}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SingleBook;
