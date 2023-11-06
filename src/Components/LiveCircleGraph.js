//this function provides an circle progress whenever called
//it needs an object as props which contains the lable of the progresscircle

import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//import LiveReport from "./LiveReport";

export default function LiveCircleGraph(props) 
{

  var dt = props.data.val;
  var max = props.data.max;
  var min = props.data.min;

  return(
    <div className="livedisplay">
    <h4 className=" txt">{props.data.name} level</h4>
    <CircularProgressbar
      value={dt}
      text={`${dt}%`}
      circleRatio={0.8}
      styles={buildStyles({
        rotation: 0.6,
        pathColor: dt > max ? "#dc3545" : dt > min ? "#58e5d5" : "#cdab46",
        strokeLinecap: "butt",
        trailColor: "#eee",
      })}
    />
    </div>
  );
}
