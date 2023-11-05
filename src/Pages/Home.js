import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Login from "./Login"
import Dashboard from "./Dashboard"

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
        <Navbar />
        <div>
      {/* {isAuthenticated ? (
        <PrivateRoute element={<Dashboard/>} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )} */}
      </div>
    <Outlet />
    </>
  );
}

export default Home;

function PrivateRoute({Component, ...rest }) {
  // Get the JWT from local storage
  const token = localStorage.getItem("token");
  //console.log("token is : " + token);

  // If there is no JWT, or it is invalid, redirect to the login page
  if (token == null) {
    alert("Login Failed!! Plz enter correct credentials.");
    return <Login />;
  }
}