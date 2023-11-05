//-----------------------------------------------------------------------------------------------------------
import React, { useState } from "react";
import axios from "axios";
import { baseURLinUse } from "../Components/ApiDataURL"; //baseURLinUse
//import Register from "./Register";
import { Link } from "react-router-dom";

const baseURL = baseURLinUse + "/Users";

function LoginPage(props) {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [jwttoken, setjwttoken] = useState("");

  async function formSubmit(e) {
    e.preventDefault();
    //call api logion
    await axios
      .post(baseURL + "/Login", { Username: User, Password: password })
      .then((response) => {
        console.log(response.status + "Received JWT token ");
        setjwttoken(response.data);
      })
      .catch((err) => {
        console.log("error" + err);
        alert("check Credential");
      });
    // If the login is successful, a JWT will be returned
    if (jwttoken) {
      localStorage.setItem("token", jwttoken); // Store the JWT in local storage
      //console.log("inside loop ");
      //Set user logged in
      props.setIsAuthenticated(true);
    }
  }

  return (
    <div
      className="container-sm border login"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        padding: "20px",
        position: "absolute",
      }}
    >
      <label className="">
        <h6>Username</h6>
        <input
          className="form-control"
          type="User"
          value={User}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter Username"
        />
      </label>
      <label>
        <h6>Password</h6>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </label>

      <button className="btn btn-secondary " onClick={formSubmit}>
        Login
      </button>
      <button className="btn btn-success ">
        <Link to="/register" className="dropdown-item">
          Register
        </Link>
      </button>
    </div>
  );
}

export default LoginPage;
//.then((response) => console.log(response + "1"))
