import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import * as authService from "../services/authService";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigation = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await authService.login(formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(res);
      toast.success("Login Success");
      navigation("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      toast.error(err.response.data.errors[0].msg);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="h-100 mx-auto" style={{ margin: "80px" }}>
        <Container className="h-100">
          <Row className="justify-content-sm-center h-100">
            <Col xxl={4} xl={5} lg={5} md={7} sm={9}>
              <div className="text-center my-2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/013/366/678/original/foot-ball-or-soccer-ball-icon-symbol-for-art-illustration-logo-website-apps-pictogram-news-infographic-or-graphic-design-element-format-png.png"
                  alt="logo"
                  width="80"
                />
              </div>
              <Card className="shadow-lg">
                <Card.Body className="p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <Form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="needs-validation"
                    noValidate
                    autoComplete="off"
                  >
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-2 text-muted">Email Address</Form.Label>
                      <Form.Control
                        type={"email"}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">Email is invalid</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <div className="mb-2 w-100">
                        <Form.Label className="text-muted">Password</Form.Label>
                        <Link to={"/forgotPassword"} className="float-end text-info">
                          Forgot Password?
                        </Link>
                      </div>

                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center align-items-center">
                      <Button type="submit" variant="primary">
                        Login
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <Card.Footer className="py-3 border-0">
                  <div className="text-center">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="link-info">
                      Create One
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
              <div className="text-center mt-2 text-muted">Copyright &copy; 2022-2023 &mdash; Huy Company</div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
