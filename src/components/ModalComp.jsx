import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Add from "./Add";
import Delete from "./Delete";
import Update from "./Update";
import View from "./View";

export default function ModalComp({ open, onClose, type, name, data, onCreateSuccess }) {
  return (
    <>
      <Modal show={open} className="mt-5" onHide={onClose} backdrop="static" keyboard={false}>
        {type === "create" ? (
          <Add
            onClose={onClose}
            title={
              name === "player" ? "Add Player" : name === "nation" ? "Add Nation" : name === "user" ? "Add User" : ""
            }
            name={name}
            data={data}
            onCreateSuccess={onCreateSuccess}
          />
        ) : type === "update" ? (
          <Update
            title={
              name === "player"
                ? "Update Player"
                : name === "nation"
                ? "Update Nation"
                : name === "profile"
                ? "Update User Profile"
                : ""
            }
            name={name}
            data={data}
            onClose={onClose}
            onCreateSuccess={onCreateSuccess}
          />
        ) : type === "view" ? (
          <View
            title={
              name === "player"
                ? "View Player"
                : name === "nation"
                ? "View Nation"
                : name === "profile"
                ? "View User Profile"
                : ""
            }
            name={name}
            data={data}
            onClose={onClose}
            onCreateSuccess={onCreateSuccess}
          />
        ) : (
          <Delete
            title={
              name === "player"
                ? "Delete Player"
                : name === "nation"
                ? "Delete Nation"
                : name === "user"
                ? "Delete User"
                : ""
            }
            name={name}
            data={data}
            onClose={onClose}
            onCreateSuccess={onCreateSuccess}
          />
        )}
      </Modal>
    </>
  );
}
