import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURLinUse } from "../Components/ApiDataURL"; //baseURLinUse

const baseURL = baseURLinUse + "/api/DeviceErrors";

function ErrorStates() {
  const [errordev, setErrordev] = useState([]);
  useEffect(() => {
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .get(baseURL, { headers })
        .then((response) => {
          console.log(response.status + "errored device status");
          setErrordev(response.data);
        })
        .catch((err) => {
          console.log("error" + err);
        });
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  return (
    <>
      <div className="container mt-3">
        <h2>Devices Causing Error Currently </h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>index</th>
              <th>errorID</th>
              <th>Floor No.</th>
              <th>sensorID</th>
            </tr>
          </thead>
          <tbody>
            {errordev.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.errorID}</td>
                <td>{item.floor}</td>
                <td>{item.sensorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ErrorStates;
