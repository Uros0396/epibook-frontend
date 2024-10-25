import Modal from "react-bootstrap/Modal";
import "./Mymodal.css";

function MyModal({ name, show }) {
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header className="text-center">
        <Modal.Title className="text-center ms-auto me-auto">
          Welcome {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h2>Epibooks</h2>
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;
