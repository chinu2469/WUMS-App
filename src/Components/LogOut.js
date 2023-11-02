import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/Login.js";

export default function LogOut() {
  const navigate = useNavigate();
  function Logout() {
    localStorage.clear();
    console.log("m i clicked");
    return navigate("/");
  }
  return (
    <div>
      <a className="btn btn-primary nav-link active col-2" onClick={Logout}>
        logOut
      </a>
    </div>
  );
}

function TimerLogOut(props) {
  useEffect(() => {
    const LoginTimer = setTimeout(() => {
      localStorage.clear();
      props.setIsAuthenticated(false);
      console.log("local clear");
    }, [3000]);

    return () => clearTimeout(LoginTimer);
  }, []);

  return <Login />;
}
