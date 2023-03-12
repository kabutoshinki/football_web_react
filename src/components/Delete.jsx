import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as nationService from "../services/nationService";
import * as playerService from "../services/playerService";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
const Delete = ({ onClose, title, name, data, onCreateSuccess }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name === "nation") {
        await nationService.deleteNation(data._id);
      } else if (name === "player") {
        await playerService.deletePlayer(data._id);
      } else if (name === "user") {
        await nationService.deleteNation(data._id);
      }
      onCreateSuccess();
      toast.success("Delete Success");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors[0].msg);
    }
  };
  return (
    <>
      <Modal.Header className="bg-danger" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <img
            src={data.image}
            id="profile-image"
            className="rounded mx-auto d-block img-fluid mb-2"
            alt={data.name}
            style={{ width: "80px", height: "80px" }}
          />
          Are You Sure To Delete: <strong>{data.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Yes
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default Delete;
