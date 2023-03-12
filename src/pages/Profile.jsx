import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import * as authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { format, isValid } from "date-fns";
import ModalComp from "../components/ModalComp";

const Profile = () => {
  const param = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const Profile = async () => {
    const { data } = await authService.getProfile(param.id);
    setProfile(data?.data);
    if (user?.id !== data?.data?._id) {
      toast.error("Link Profile is not corrected please try again");
      navigate("/");
    }
  };

  const handleCreateSuccess = () => {
    Profile();
  };

  useEffect(() => {
    Profile();
  }, []);
  const dob = isValid(new Date(profile?.dob)) ? format(new Date(profile?.dob), "dd/MM/yyyy") : "";
  return (
    <div>
      <div className="mb-5">
        <Navbar />
      </div>
      <div
        style={{
          minHeight: "100vh",
          background: `url(https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-_Tcjok-d9b4.jpg)`,
        }}
      >
        <Container
          className="mb-4 p-3 shadow-lg"
          style={{
            paddingTop: "80px",
            height: "500px",
            background: `url(https://static.vecteezy.com/system/resources/previews/001/984/880/original/abstract-colorful-geometric-overlapping-background-and-texture-free-vector.jpg)`,
          }}
        >
          <Row>
            <h1 className="text-center" style={{ marginTop: "80px" }}>
              PROFILE
            </h1>
            <Col md={6}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src={profile.image}
                  className="rounded img-thumbnail"
                  style={{ width: "200px", height: "200px" }}
                  alt="user profile"
                />
                <button className="btn btn-success b-2 mt-2" onClick={() => setOpenModal(true)}>
                  Edit Profile
                </button>
              </div>
            </Col>
            <Col md={6}>
              <div className="card p-4 h-100">
                <span className="name mt-3">
                  Email: <strong>{profile.email}</strong>
                </span>
                <span className="name mt-3">
                  Name: <strong>{profile.name}</strong>
                </span>
                <span className="name mt-3">
                  DOB: <strong>{dob}</strong>
                </span>
              </div>
            </Col>
            <Col md={12} className="text-center mt-2">
              <ModalComp
                open={openModal}
                name={"profile"}
                onClose={() => setOpenModal(false)}
                type={"update"}
                data={profile}
                onCreateSuccess={handleCreateSuccess}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
