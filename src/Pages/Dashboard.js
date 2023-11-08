import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
// import FloorWise from "./FloorWise";
// import LiveReport from "./LiveReport";
import LiveCircleGraph from "../Components/LiveCircleGraph";
import { baseURLinUse } from "../Components/ApiDataURL"; //baseURLinUse
import Single_Graph from "../Components/Single_Graph";
import MultipleGraph from "../Components/MultipleGraph"

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

  const WQIobj = { Name: "WQI", val: livedata.wqi || 2, max: 60, min:45  };
// using livedata?.wqi || 0 ensures that it defaults to 0 if livedata or livedata.wqi is undefined

    return (
      <React.Fragment>
        <div className="container-fluid">
              {/* the divs whic are  used to show the data live feed and the next is for floor wise */}
          <div className="row">
              <div className="WQI col-md-3 mb-4">
              <LiveCircleGraph data={WQIobj}/>
              </div>
              <div className="Ranker col-md-2 mb-4 txt ">
                  <h2>Champions</h2>
                  <h5 style={{color: "grey"}}>in Water saving</h5>
                  <div id="rank1" >Floor 3</div>
                  <div id="rank2" >Floor 8</div>
                  <div id="rank3" >Floor 2</div>
                  <div id="rank4" >Floor 4</div>
                  <div id="rank5" >Floor 9</div>
              </div>
              <div className="ShortGraph col-md-7">
              <Single_Graph/>
              </div>
              <div className="MultiGraph ">
                <MultipleGraph/>
              </div>

          </div>
        </div>

      </React.Fragment>
    );
  }


export default Dashboard;