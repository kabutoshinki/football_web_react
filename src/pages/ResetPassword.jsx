import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import * as authService from "../services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const initData = {
    email: localStorage.getItem("emailForgot") || "",
    password: "",
    password_confirm: "",
  };

  const [formData, setFormData] = useState(initData);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation logic
    if (formData.email === "") {
      // toast.error("Email not found");
      navigate("/forgotPassword");
    }
    try {
      console.log(formData);
      await authService.resetPassword(formData);
      toast.success("Reset Password Success");
      localStorage.removeItem("emailForgot");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <section className="h-100" style={{ marginTop: "60px" }}>
        <Container className="h-100">
          <Row className="justify-content-sm-center h-100">
            <Col className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/013/366/678/original/foot-ball-or-soccer-ball-icon-symbol-for-art-illustration-logo-website-apps-pictogram-news-infographic-or-graphic-design-element-format-png.png"
                  alt="logo"
                  width="80"
                />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Reset Password</h1>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-2 text-muted" htmlFor="password">
                        New Password
                      </Form.Label>
                      <Form.Control
                        id="password"
                        type="password"
                        value={formData.password}
                        name="password"
                        required
                        autoFocus
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-2 text-muted" htmlFor="password_confirm">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        id="password_confirm"
                        type="password"
                        value={formData.password_confirm}
                        name="password_confirm"
                        required
                        autoFocus
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div className="d-flex align-items-center">
                      <Button type="submit" className="btn btn-primary ms-auto">
                        Reset Password
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Remember your password?{" "}
                    <Link to={"/login"} className=" text-info">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">Copyright &copy; 2022-2023 &mdash; Huy Company</div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ResetPassword;
