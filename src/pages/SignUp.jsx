import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import avatar from "../images/avatar.jpg";
import * as authService from "../services/authService";
import { toast } from "react-toastify";
const SignUp = () => {
  const initData = {
    email: "",
    image:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    name: "",
    dob: "",
    password: "",
  };
  const [formData, setFormData] = useState(initData);
  const navigate = useNavigate();
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
      form.append("email", formData.email);
      form.append("image", formData.image);
      form.append("name", formData.name);
      form.append("dob", formData.dob);
      form.append("password", formData.password);
      // Send the form data to the server using fetch or Axios or any other library
      await authService.register(form);
      toast.success("Register Success");
      navigate("/login");
      console.log(formData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors[0].msg);
    }
  };

  return (
    <>
      <Navbar />
      <section className="h-100" style={{ marginTop: "80px" }}>
        <Container className="h-100 ">
          <Row className="justify-content-sm-center h-100">
            <Col xxl={4} xl={5} lg={5} md={7} sm={9} style={{ width: "800px" }}>
              <div className="text-center my-2">
                <img src={logo} alt="logo" width="80" />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h1 className="fs-4 card-title fw-bold mb-2 text-center">Register</h1>

                  <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                      <Col xs={6}>
                        <img
                          src={avatar}
                          id="profile-image"
                          alt="logo"
                          style={{ width: "100px", height: "100px" }}
                          className="img-fluid rounded mx-auto d-block"
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="mb-2 text-muted">E-Mail Address</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            autoFocus
                          />
                          <Form.Control.Feedback type="invalid">Email is invalid</Form.Control.Feedback>
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
                            autoFocus
                            onChange={handleFileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="mb-2 text-muted">Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
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
                        <Form.Group className="mb-3">
                          <Form.Label className="mb-2 text-muted">Date</Form.Label>
                          <Form.Control
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            min="2001-01-01"
                            max="2015-12-31"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="mb-2 text-muted">Password</Form.Label>
                          <Form.Control
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            name="password"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-center align-items-center">
                      <Button type="submit" className="btn btn-primary">
                        Register
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account?{" "}
                    <Link to={"/login"} className="link-info">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2 text-muted">&copy; 2017-2021 &mdash; Huy Company</div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
