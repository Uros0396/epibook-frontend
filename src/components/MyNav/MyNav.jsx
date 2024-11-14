import { Container, Row, Col, Button } from "react-bootstrap";

import { useContext } from "react";
import { DarkContext } from "../../contexts/DarkContext";
import { Link, useNavigate } from "react-router-dom";
import "../MyNav/MyNav.css";
import InputNav from "../InputNav/InputNav";

const MyNav = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Authorized");
    navigate("/");
  };

  return (
    <nav>
      <Container
        fluid
        className={`fixed-top ${isDarkMode ? "bg-black" : "bg-info"}`}
      >
        <Row>
          <Col
            lg={12}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex justify-content-center align-items-center gap-5 text-primary">
              <h1>
                <em>Epibooks</em>
              </h1>

              <ul className="d-flex justify-content-center align-items-center gap-4 text-light list-unstyled m-0">
                <Link to="/Registration" className="text-decoration-none">
                  <li>Registration</li>
                </Link>
                <Link to="/MakeBook" className="text-decoration-none">
                  <li>Make Your Book</li>
                </Link>
              </ul>
            </div>

            <InputNav />

            <div className="d-flex align-items-center">
              <Button
                variant="info"
                onClick={toggleDarkMode}
                className={`${
                  isDarkMode ? "bg-black && text-info" : "text-primary"
                }`}
              >
                <em>Change Mode</em>
              </Button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default MyNav;
