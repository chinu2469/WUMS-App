import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURLinUse } from "../Components/ApiDataURL"; //baseURLinUse

const baseURL = baseURLinUse + "/Users";

function Register() {
  const navigate = useNavigate();
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  async function formSubmit(e) {
    e.preventDefault();
    //call api logion
    await axios
      .post(baseURL + "/Register", {
        Username: User,
        Password: password,
        Email: email,
        MobileNo: mobileNo,
      })
      .then((response) => {
        console.log(response.status + "user created");
        alert("User Created Succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("error" + err);
        alert("check inputs");
      });
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
      }}
    >
      <h2>Register Yourself</h2>
      <div>
        <label className="">
          <h6>Username</h6>
          <input
            className="form-control"
            type="User"
            value={User}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter Unique Username"
          />
        </label>
        <label>
          <h6>Password</h6>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Safe Password"
          />
        </label>
        <label>
          <h6>Mobile No.</h6>
          <input
            className="form-control"
            type="mobile"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Enter your mobile no."
          />
        </label>
        <label>
          <h6>Email</h6>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email id"
          />
        </label>

        <button className="btn btn-success " onClick={formSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}
export default Register;
