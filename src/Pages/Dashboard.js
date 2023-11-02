import React from "react";
import FloorWise from "./FloorWise";
import LiveReport from "./LiveReport";
import Simulator from "./Simulator";

//this is main container for every object and wraps all the data showed in display other than nav and footer
export default class MainContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="container-fluid  border">
            
            <div className="container-fluid mainContent">
              {/* the divs whic are  used to show the data live feed and the next is for floor wise */}/
              <div className="">

              </div>
              {/* <LiveReport />
              <FloorWise /> */}
            </div>
          </div>
        </div>
        {/* this is simmulator wich have a button this will immediately add the value to database */}
        <Simulator />
      </React.Fragment>
    );
  }
}
