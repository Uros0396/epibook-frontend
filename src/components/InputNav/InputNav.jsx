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
            Invia
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputNav;
