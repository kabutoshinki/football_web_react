import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as indexService from "../services/homeService";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
const SearchPlayerComp = () => {
  const [players, setPlayers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [playerName, setPlayerName] = useState("");
  // const [filterText, setFilterText] = useState("");

  const param = useParams();

  const playersPerPage = 3;
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
  };
  const testPlayer = async () => {
    try {
      const { data } = await indexService.searchPlayers(currentPage, param.name);
      console.log(data);
      setPlayers(data.list);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(players);
  useEffect(() => {
    testPlayer();
  }, [currentPage, param.name]);
  const pageCount = Math.ceil(total / playersPerPage);
  return (
    <Box
      sx={{
        pt: "80px",
        minHeight: "100vh",
        background: `url(https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg)`,
        backgroundSize: "cover",
      }}
    >
      {""}
      {/* this is the container under the navbar */}
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Searching players name "{param.name}"
      </Typography>

      {players?.length !== 0 ? (
        <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
          {players?.map((player) => (
            <Card key={player._id} sx={{ width: "16rem", height: "auto", marginTop: 5, marginRight: 5, marginLeft: 5 }}>
              <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
                <Grid container spacing={2} alignItems="center" justifyContent={"center"}>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h5"
                      className="font-weight-bold text-truncate"
                      component={"div"}
                      sx={{ mb: 0, maxWidth: "100px" }}
                    >
                      {player.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar alt={player.nation.name} src={player.nation.image} sx={{ width: 30, height: 30 }} />
                  </Grid>
                </Grid>
              </CardContent>
              <img
                src={player.image}
                alt={player.name}
                className="img-fluid rounded mx-auto d-block"
                style={{ width: "90%", height: "250px", marginLeft: "auto", marginRight: "auto" }}
              />
              <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
                <div className="d-flex justify-content-center">
                  <img
                    src="https://icon-library.com/images/soccer-goal-icon/soccer-goal-icon-19.jpg"
                    style={{ width: "30px", marginRight: " 10px" }}
                    alt="goals icon"
                  />
                  <Typography variant="h6" component={"div"}>
                    {player.goals}
                  </Typography>
                </div>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", textAlign: "center" }}>
                <Link className="btn btn-primary mb-2" to={`/players/${player._id}`}>
                  View Detail
                </Link>
              </CardActions>
            </Card>
          ))}
        </Grid>
      ) : (
        <div>
          <Alert key={"warning"} className="text-center mt-5" variant={"warning"}>
            Player name "{param.name}" not exist, Please Try Again
          </Alert>
        </div>
      )}
      {pages > 1 ? (
        <ReactPaginate
          className=""
          previousLabel={"<"}
          breakLabel={"..."}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center mt-5"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          breakClassName={"page-item"}
          activeLinkClassName={"active"}
        />
      ) : null}
    </Box>
  );
};

export default SearchPlayerComp;
