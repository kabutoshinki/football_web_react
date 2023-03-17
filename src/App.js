// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Nations from "./pages/Nations";
import Users from "./pages/Users";
import PlayerDetail from "./pages/PlayerDetail";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmOTP from "./pages/ConfirmOTP";
import ResetPassword from "./pages/ResetPassword";
function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  // const RequireAuth = ({ children }) => {
  //   return user?.isAdmin === true ? children : <Navigate to="/login" />;
  // };
  const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    if (!user) {
      toast.error("You need to be logged in to access this page.");
      // navigate("/login");
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };
  const RequireAuthor = ({ children }) => {
    const navigate = useNavigate();

    if (!user?.isAdmin) {
      toast.error("You don't have permission to access this page.");
      // navigate("/");
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };
  // const navigate = useNavigate();
  // const RequireAuth = ({ children }) => {
  //   useEffect(() => {
  //     if (!user) {
  //       toast.error("You need to be logged in to access this page.");
  //       // <navigate("/login");>
  //       <Navigate to="/login" />;
  //     }
  //   }, [user]);

  //   return user?.isAdmin === true ? children : null;
  // };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search/:name" exact element={<Search />} />
        <Route
          path="/players"
          exact
          element={
            <RequireAuth>
              <RequireAuthor>
                <Players />
              </RequireAuthor>
            </RequireAuth>
          }
        />
        <Route
          path="/nations"
          exact
          element={
            <RequireAuth>
              <RequireAuthor>
                <Nations />
              </RequireAuthor>
            </RequireAuth>
          }
        />
        <Route path="/players/:id" exact element={<PlayerDetail />} />
        <Route
          path="/users"
          exact
          element={
            <RequireAuth>
              <RequireAuthor>
                <Users />
              </RequireAuthor>
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:id"
          exact
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/confirmOTP" exact element={<ConfirmOTP />} />
        <Route path="/resetPassword" exact element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
