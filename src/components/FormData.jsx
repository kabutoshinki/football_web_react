import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as nationService from "../services/nationService";
import * as playerService from "../services/playerService";
import * as userService from "../services/userService";
import * as authService from "../services/authService";
import "react-widgets/scss/styles.scss";
import Combobox from "react-widgets/Combobox";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import avatar from "../images/avatar.jpg";
export const AddNation = ({ onClose, onCreateSuccess }) => {
  const initNation = {
    name: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initNation);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const newImageSrc = reader.result;
      const imgElement = document.getElementById("profile-image");
      imgElement.setAttribute("src", newImageSrc);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("description", formData.description);
      await nationService.addNation(form);
      toast.success("Create Nation Success");
      onCreateSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Row>
        <Col xs={6}>
          <img
            src={avatar}
            id="profile-image"
            className="rounded mx-auto d-block img-fluid"
            alt={"player img"}
            style={{ width: "80px", height: "80px" }}
          />
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nation Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="File Image"
              name="image"
              onChange={handleFileChange}
              autoFocus
              required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
};
export const UpdateNation = ({ onClose, data, type, onCreateSuccess }) => {
  const initNation = {
    name: data.name,
    description: data.description,
    image: "",
    _id: data?._id,
    originImg: data?.image,
  };
  const [formData, setFormData] = useState(initNation);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const newImageSrc = reader.result;
      const imgElement = document.getElementById("profile-image");
      imgElement.setAttribute("src", newImageSrc);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("originImg", data.image);
      form.append("_id", formData._id);
      await nationService.updateNation(form);
      toast.success("Update Nation Success");
      onCreateSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Row>
        <Col xs={6}>
          <img
            src={data.image}
            id="profile-image"
            className="rounded mx-auto d-block img-fluid"
            alt={"player img"}
            style={{ width: "80px", height: "80px" }}
          />
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nation Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="File Image"
              name="image"
              onChange={handleFileChange}
              disabled={type !== undefined && type === "view" ? true : false}
              autoFocus
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              disabled={type !== undefined && type === "view" ? true : false}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {type !== undefined && type === "view" ? (
          ""
        ) : (
          <Button variant="primary" type="submit">
            Update
          </Button>
        )}
      </Modal.Footer>
    </Form>
  );
};

export const AddPlayer = ({ onClose, onCreateSuccess }) => {
  const initPlayer = {
    name: "",
    description: "",
    image: "",
    nation: "",
    club: "",
    position: "",
    goals: 0,
    isCaptain: "",
  };

  const [formData, setFormData] = useState(initPlayer);
  const [nations, setNations] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const newImageSrc = reader.result;
      const imgElement = document.getElementById("profile-image");
      imgElement.setAttribute("src", newImageSrc);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("nation", formData.nation);
      form.append("club", formData.club);
      form.append("position", formData.position);
      form.append("goals", formData.goals);
      form.append("isCaptain", formData.isCaptain);
      await playerService.addPlayer(form);
      toast.success("Create Player Success");
      onCreateSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  const nationData = async () => {
    const { data } = await nationService.getNations();
    setNations(data);
  };
  console.log(nations);
  useEffect(() => {
    nationData();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={6}>
          <img
            src={avatar}
            id="profile-image"
            className="rounded mx-auto d-block img-fluid"
            alt={"player img"}
            style={{ width: "80px", height: "80px" }}
          />
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Player Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="File Image"
              name="image"
              onChange={handleFileChange}
              autoFocus
              required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Nation</Form.Label>
            <Form.Select as="select" name="nation" onChange={handleInputChange} required>
              <option value="" selected>
                Open this select menu
              </option>
              {nations.map((nation, index) => (
                <option key={index} value={nation._id}>
                  {nation.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={handleInputChange} required />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Club</Form.Label>
            <Form.Control as="select" name="club" onChange={handleInputChange} required>
              <option value="" selected>
                Select a Club
              </option>
              <option value="Arsenal">Arsenal</option>
              <option value="Chelsea">Chelsea</option>
              <option value="Liverpool">Liverpool</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Goals</Form.Label>
            <Form.Control type="number" name="goals" defaultValue={0} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Position</Form.Label>
            <Form.Control as="select" name="position" onChange={handleInputChange} required>
              <option value="" selected>
                Select a Position
              </option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Attack">Attack</option>
              <option value="Defensive Midfielder">Defensive Midfielder</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}></Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" required>
            <Form.Label className="me-4">Captain </Form.Label>
            {/* <Form.Check inline label="No" value={false} name="isCaptain" checked type="radio" onChange={handleChange} />
            <Form.Check inline label="Yes" value={true} name="isCaptain" type="radio" onChange={handleChange} /> */}
            <Form.Check
              inline
              label="No"
              value={"false"}
              name="isCaptain"
              defaultChecked={true}
              type="radio"
              onChange={handleInputChange}
              required
            />
            <Form.Check
              inline
              label="Yes"
              value={"true"}
              name="isCaptain"
              type="radio"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export const UpdatePlayer = ({ onClose, data, type, onCreateSuccess }) => {
  const initPlayer = {
    id: data._id,
    name: data.name,
    description: data.description,
    image: "",
    nation: data.nation._id,
    club: data.club,
    position: data.position,
    goals: data.goals,
    isCaptain: `${data.isCaptain}`,
    originImg: data?.image,
  };

  const [formData, setFormData] = useState(initPlayer);
  const [nations, setNations] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const newImageSrc = reader.result;
      const imgElement = document.getElementById("profile-image");
      imgElement.setAttribute("src", newImageSrc);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("_id", formData.id);
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("nation", formData.nation);
      form.append("club", formData.club);
      form.append("position", formData.position);
      form.append("goals", formData.goals);
      form.append("isCaptain", formData.isCaptain);
      form.append("originImg", data.image);
      await playerService.updatePlayer(form);
      toast.success("Upload Player Success");
      onCreateSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };

  const nationData = async () => {
    const { data } = await nationService.getNations();
    setNations(data);
  };

  useEffect(() => {
    nationData();
  }, []);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Row>
        <Col xs={6}>
          <img
            src={data.image}
            id="profile-image"
            className="rounded mx-auto d-block img-fluid"
            alt={data.name}
            style={{ width: "80px", height: "80px" }}
          />
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Player Name"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="File Image"
              name="image"
              onChange={handleFileChange}
              disabled={type !== undefined && type === "view" ? true : false}
              autoFocus
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Nation</Form.Label>
            <Form.Select
              as="select"
              name="nation"
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            >
              <option>Open this select menu</option>
              {nations.map((nation, index) => (
                <option key={index} value={nation._id} selected={data.nation.name === nation.name ? true : false}>
                  {nation.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              name="description"
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Club</Form.Label>
            <Form.Control
              as="select"
              name="club"
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            >
              <option value="" selected>
                Select a Club
              </option>
              <option value="Arsenal" selected={formData.club === "Arsenal" ? true : false}>
                Arsenal
              </option>
              <option value="Chelsea" selected={formData.club === "Chelsea" ? true : false}>
                Chelsea
              </option>
              <option value="Liverpool" selected={formData.club === "Liverpool" ? true : false}>
                Liverpool
              </option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Goals</Form.Label>
            <Form.Control
              type="number"
              name="goals"
              value={formData.goals}
              disabled={type !== undefined && type === "view" ? true : false}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Position</Form.Label>
            <Form.Control
              as="select"
              name="position"
              onChange={handleInputChange}
              disabled={type !== undefined && type === "view" ? true : false}
              required
            >
              <option value="" selected>
                Select a Position
              </option>
              <option value="Goalkeeper" selected={formData.position === "Goalkeeper" ? true : false}>
                Goalkeeper
              </option>
              <option value="Attack" selected={formData.position === "Attack" ? true : false}>
                Attack
              </option>
              <option
                value="Defensive Midfielder"
                selected={formData.position === "Defensive Midfielder" ? true : false}
              >
                Defensive Midfielder
              </option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}></Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="me-4">Captain </Form.Label>
            <Form.Check
              inline
              label="No"
              value={"false"}
              name="isCaptain"
              checked={formData.isCaptain === "false" ? true : false}
              type="radio"
              disabled={type !== undefined && type === "view" ? true : false}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label="Yes"
              value={"true"}
              name="isCaptain"
              checked={formData.isCaptain === "true" ? true : false}
              type="radio"
              disabled={type !== undefined && type === "view" ? true : false}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {type !== undefined && type === "view" ? (
          ""
        ) : (
          <Button variant="primary" type="submit">
            Save
          </Button>
        )}
      </Modal.Footer>
    </Form>
  );
};

export const UpdateProfileUser = ({ onClose, data, onCreateSuccess }) => {
  const { dispatch } = useContext(AuthContext);
  const initProfile = {
    id: data._id,
    name: data.name,
    dob: data.dob,
    image: "",
    originImg: data.image,
    password: data.password,
    confirmPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initProfile);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const newImageSrc = reader.result;
      const imgElement = document.getElementById("profile-image");
      imgElement.setAttribute("src", newImageSrc);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData();
      form.append("_id", formData.id);
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("dob", formData.dob);
      form.append("password", formData.password);
      form.append("confirmPassword", formData.confirmPassword);
      form.append("newPassword", formData.newPassword);
      form.append("confirmNewPassword", formData.confirmNewPassword);
      form.append("originImg", data.image);
      // Send the form data to the server using fetch or Axios or any other library
      await authService.editProfile(form);
      toast.success("Edit Success");
      if (formData.confirmPassword.length > 1) {
        await authService.logout();
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
      onCreateSuccess();
      onClose();
      console.log(formData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors[0].msg);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col xs={6}>
            <img
              src={data.image}
              id="profile-image"
              className="rounded mx-auto d-block img-fluid"
              alt={data.name}
              style={{ width: "80px", height: "80px" }}
            />
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="name" value={data.email} onChange={handleInputChange} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleFileChange} />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                name="dob"
                value={formatDate(formData.dob)}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {" "}
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="confirmNewPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="password" hidden>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
};
