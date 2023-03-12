import React from "react";
import Modal from "react-bootstrap/Modal";
import * as formDataType from "./FormData";
const Update = ({ onClose, title, name, data, onCreateSuccess }) => {
  return (
    <>
      <Modal.Header className="bg-primary" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {name === "player" && (
          <formDataType.UpdatePlayer onClose={onClose} data={data} onCreateSuccess={onCreateSuccess} />
        )}
        {name === "nation" && (
          <formDataType.UpdateNation onClose={onClose} data={data} onCreateSuccess={onCreateSuccess} />
        )}
        {name === "profile" && (
          <formDataType.UpdateProfileUser onClose={onClose} data={data} onCreateSuccess={onCreateSuccess} />
        )}
      </Modal.Body>
    </>
  );
};

export default Update;
