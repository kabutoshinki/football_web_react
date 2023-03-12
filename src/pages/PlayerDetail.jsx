import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Image, Form, Button, Container } from "react-bootstrap";
import * as playerService from "../services/playerService";
const PlayerDetail = () => {
  const param = useParams();
  console.log(param.id);
  const [player, setPlayer] = useState("");
  const PlayerDetai = async () => {
    const { data } = await playerService.getPlayerById(param.id);
    setPlayer(data);
  };

  useEffect(() => {
    PlayerDetai();
  }, []);

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "100px" }}>
        <div className="container">
          <h1 className="text-info text-center">{player?.name}</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="card p-4 h-100">
                <div className="mb-3">
                  <h3 className="form-label text-center">Avatar </h3>
                  <Image
                    src={player?.image}
                    className="rounded mx-auto my-auto d-block mb-3"
                    alt="nation img"
                    style={{ height: "250px", width: "250px" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-4 h-100">
                <div className="mb-3">
                  <h3 className="form-label text-center">Nation </h3>
                  <Image
                    src={player?.nation?.image}
                    className="rounded mx-auto my-auto d-block mb-3"
                    alt="nation img"
                    style={{ height: "100px", width: "250px" }}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label className="form-label">Description: </Form.Label>
                  <p>
                    <strong>{player?.description}</strong>
                  </p>
                </div>
                <div className="mb-3">
                  <span className="form-label">
                    Club: <strong>{player?.club}</strong>{" "}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="form-label">
                    Position: <strong>{player?.position}</strong>
                  </span>
                </div>
                <div className="mb-3">
                  <span className="form-label">
                    Goals: <strong>{player?.goals}</strong>
                  </span>
                </div>
                <div className="mb-3">
                  <span className="form-label">
                    Captain: <strong>{player.isCaptain ? "Yes" : "No"}</strong>
                  </span>
                </div>
                <div className="d-grid gap-2">
                  <Link to={"/"} className="btn btn-secondary">
                    Return
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlayerDetail;
