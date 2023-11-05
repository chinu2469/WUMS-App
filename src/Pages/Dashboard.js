import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
// import FloorWise from "./FloorWise";
// import LiveReport from "./LiveReport";
import LiveCircleGraph from "../Components/LiveCircleGraph";
import { baseURLinUse } from "../Components/ApiDataURL"; //baseURLinUse

const baseURL = baseURLinUse + "/QSData/LastRowdata";
//this is main container for every object and wraps all the data showed in display other than nav and footer
const Dashboard = () => {

  const [livedata, setLivedata] = useState({});
  console.log(livedata.wqi)
  useEffect(() => {
    const getdata = setInterval(() => {
    //   const headers = {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
     // };
      axios
        .get(baseURL) //, { headers }
        .then((response) => {
          console.log(response.status + " live data status");
          setLivedata(response.data);
        })
        .catch((err) => {
          console.log("error" + err);
        });
    }, 3000);
    return () => clearInterval(getdata);
  }, []);

  const WQIobj = { Name: "WQI", val: livedata.wqi || 2, max: 80, min: 30 };
// using livedata?.wqi || 0 ensures that it defaults to 0 if livedata or livedata.wqi is undefined

    return (
      <React.Fragment>
        <div className="container-fluid mainContent">
              {/* the divs whic are  used to show the data live feed and the next is for floor wise */}
              <div className="WQI">
              <LiveCircleGraph data={WQIobj}/>
              </div>
              <div className="Ranker">

              </div>
              <div className="ShortGraph">

              </div>
              <div className="table.value">

              </div>
            </div>
      </React.Fragment>
    );
  }


export default Dashboard;