{
  /*import { useContext, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import { BookContext } from "../../contexts/BookContext";
import { SearchContext } from "../SearchContext/SearchContext";

const InputNav = () => {
  const { inputValue, handleInputChange, handleSubmitForm } =
    useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState(SearchContext);

  return (
    <Form className="d-inline-flex" onSubmit={handleSubmitForm}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Cerca libro"
            value={inputValue}
            onChange={handleInputChange}
            className="mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button variant="success" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputNav;*/
}

import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BookContext } from "../../contexts/BookContext";

const InputNav = () => {
  const { inputValue, handleInputChange, handleSubmitForm } =
    useContext(BookContext);

  return (
    <Form className="d-inline-flex" onSubmit={handleSubmitForm}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Cerca libro"
            value={inputValue}
            onChange={handleInputChange}
            className="mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button variant="success" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputNav;
