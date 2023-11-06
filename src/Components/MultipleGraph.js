import React, {useEffect, useState, Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import { baseURLinUse } from './ApiDataURL'; 
import axios from 'axios';
import Today from './Todate';
const baseURL = baseURLinUse + "/ByDay/";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




export default function MultipleGraph() 
{	
	
    const toggleDataSeries = (e) => {
        const dataSeries = e.dataSeries;
        if (typeof dataSeries.visible === "undefined" || dataSeries.visible) {
          dataSeries.visible = false;
        } else {
          dataSeries.visible = true;
        }
        e.chart.render();
      };

    const [phData,   setphData] = useState([]);
    const [turbData, setturbData] = useState([]);
    const [condData, setcondData] = useState([]);
    const [co2Data,  setco2Data] = useState([]);
    const [humiData, sethumiData] = useState([]);
    const [tempData, settempData] = useState([]);
    const [clorData, setclorData] = useState([]);

var last15 = [];

    useEffect(() => {
        try {
          const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
                };
        const getdata = setInterval(() => {
          axios
            .get(baseURL +"2023-10-30" ) //, { headers } Today() 
            .then((response) => {
              console.log(response.status + " wqi data status");
              //setbyday(response.data);
              last15 = response.data;
              const valuesArray = Object.values(last15);
              const formattedData = valuesArray.map(item => 
                {
                    const date = new Date(item.date);
                    const hour = date.getHours();
                    const minute = date.getMinutes();
                    const wqi = item.wqi;
                
                    //setting data`${hour}:${minute}` 
                    setphData(prevData => [
                        ...prevData,
                        { x: date, y: item.ph }
                      ]);
                    setturbData(prevData => [
                        ...prevData,
                        { x: date, y: item.turbidity }
                      ]);
                    setcondData(prevData => [
                        ...prevData,
                        { x: date, y: item.conductivity }
                      ]);
                    setco2Data(prevData => [
                        ...prevData,
                        { x: date, y: item.co2 }
                      ]);
                    sethumiData(prevData => [
                        ...prevData,
                        { x: date, y: item.humidity }
                      ]);
                    settempData(prevData => [
                        ...prevData,
                        { x: date, y: item.temp }
                      ]);
                    setclorData(prevData => [
                        ...prevData,
                        { x: date, y: item.clorin }
                      ]);
                    return (0);
                });
                console.log(formattedData);
                console.log(phData);
            })
            .catch((err) => {
              console.log("error" + err);
            });
        }, 3000);
        return () => clearInterval(getdata)
        } catch (ex) {
          console.log(ex);
        }
    }, []);
    
	
    const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Water Quality Day"
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series"
			}],
			axisX: {
				title: "Time"
			},
			axisY: {
				title: "Unit",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
		
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
                itemclick: toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "PH",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "#,##0",
				dataPoints: phData
			},
			{
				type: "spline",
				name: "Turbiduity",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: turbData
			},
            {
				type: "spline",
				name: "Conductivity",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: condData
			},
            {
				type: "spline",
				name: "Co2",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: co2Data
			},
            {
				type: "spline",
				name: "Humidity ",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: humiData
			},
            {
				type: "spline",
				name: "Temperature",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: tempData
			},
            {
				type: "spline",
				name: "Clorin",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "HH:mm",
				yValueFormatString: "$#,##0.#",
				dataPoints: clorData
			}
        
        ]
		
        }
		return(
		<div>
			<CanvasJSChart options = {options} 
				
			/>
		</div>
		);
	
			
}
 // onRef={ref => this.chart = ref}
//  axisY2: {
//     title: "Time",
//     titleFontColor: "#51CDA0",
//     lineColor: "#51CDA0",
//     labelFontColor: "#51CDA0",
//     tickColor: "#51CDA0"
// }
