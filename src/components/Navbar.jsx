import React, { useContext, useEffect, useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, InputBase } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DrawerComp from "./DrawerComp";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as authService from "../services/authService";
import { toast } from "react-toastify";
import logo from "../images/logo.png";
const navLink = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Players",
    href: "/players",
  },
  {
    name: "Nations",
    href: "/nations",
  },
  {
    name: "Users",
    href: "/users",
  },
];

const Navbar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    const index = navLink.findIndex((page) => page.href === path);
    if (index !== -1) {
      setValue(index);
    }
  }, [location.pathname]);

  const handleSearch = (event) => {
    // setSearchValue(event.target.value);
    const trimmedValue = event.target.value.trim();
    setSearchValue(trimmedValue);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedSearchValue = searchValue.trim();
    if (searchValue) {
      navigate(`/search/${trimmedSearchValue}`);
    }
    // setSearchValue("");
  };

  const handleLogout = async () => {
    await authService.logout();
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Success");
    navigate("/");
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#24b55c" }}>
        <Toolbar>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="mx-2" width="32" />
          </Link>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>Football</Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <div>
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="secondary"
                >
                  {/* //<LinkTab label="Page One" key={index} href="/drafts" /> */}
                  {!user || !user.isAdmin ? <Tab label={"Home"} to={"/"} component={Link} /> : null}

                  {navLink.map((item, index) =>
                    user && user.isAdmin ? <Tab label={item.name} to={item.href} key={index} component={Link} /> : null
                  )}
                </Tabs>
              </div>
              {/* <form onSubmit={handleSearchSubmit} style={{ marginLeft: "auto" }}>
                <input placeholder="Search Player" value={searchValue} onChange={handleSearch} />
              </form> */}

              <Form inline onSubmit={handleSearchSubmit} style={{ marginLeft: "auto" }}>
                <FormControl
                  type="text"
                  placeholder="Search Player"
                  className="flex me-sm-5"
                  value={searchValue}
                  maxLength={30}
                  onChange={handleSearch}
                  required
                />
                {/* <Button variant="outline-success" type="submit">
                  Search
                </Button> */}
              </Form>
              {user ? (
                <div style={{ marginLeft: "auto" }}>
                  <Link to={`/profile/${user.id}`} className="ml-auto btn btn-warning ms-3 text-white">
                    Profile
                  </Link>
                  <Button className="btn btn-primary ms-3" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div style={{ marginLeft: "auto" }}>
                  <Link to={"/login"} className="ml-auto btn btn-primary ms-3">
                    Login
                  </Link>
                  <Link to={"/register"} className="btn btn-secondary ms-3">
                    SignUp
                  </Link>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
