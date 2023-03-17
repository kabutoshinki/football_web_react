import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import * as authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmOTP = () => {
  const initData = {
    email: localStorage.getItem("emailForgot") || "",
    otp: "",
  };
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(initData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation logic
    if (formData.email === "") {
      navigate("/forgotPassword");
    }
    try {
      console.log(formData);
      await authService.confirmOTP(formData);
      toast.success("Confirm OTP Success");
      navigate("/resetPassword");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      toast.error("Email not found");
      navigate("/forgotPassword");
    }
    try {
      await authService.resendOTP(formData);
      toast.success("Re send OTP success waiting few minute");
    } catch (error) {
      toast.error(error.response.data.message);
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
                  {errors.length > 0 &&
                    errors.map((error, index) => (
                      <Alert key={index} variant="warning" dismissible>
                        {error}
                      </Alert>
                    ))}
                  <h1 className="fs-4 card-title fw-bold mb-4">Confirm OTP</h1>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-2 text-muted" htmlFor="otp">
                        OTP
                      </Form.Label>
                      <Form.Control
                        id="otp"
                        type="text"
                        name="otp"
                        required
                        maxLength="6"
                        autoFocus
                        value={formData.otp}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="d-flex align-items-center">
                      <Button type="submit" className="btn btn-primary ms-auto">
                        Send OTP
                      </Button>
                    </div>
                  </Form>

                  <div className="mt-2 border-0">
                    <Form onSubmit={handleResendOTP}>
                      <div className="text-center">
                        Not receive code ?{" "}
                        <Button type="submit" variant="link text-info">
                          Resend Code
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Remember your password?{" "}
                    <Link to={"/login"} className="text-info">
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

export default ConfirmOTP;
