import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formDataType from "./FormData";

const Add = ({ onClose, title, name, onCreateSuccess }) => {
  return (
    <>
      <Modal.Header className="bg-success" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {name === "player" && <formDataType.AddPlayer onClose={onClose} onCreateSuccess={onCreateSuccess} />}
        {name === "nation" && <formDataType.AddNation onClose={onClose} onCreateSuccess={onCreateSuccess} />}
      </Modal.Body>
    </>
  );
};

export default Add;
