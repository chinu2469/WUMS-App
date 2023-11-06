



import React, { useState ,useEffect, Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { map } from 'jquery';
import { baseURLinUse } from './ApiDataURL';
import axios from 'axios';
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const baseURL = baseURLinUse + "/QSData/Last15Rowdata";

export default function Single_Graph()
{	
    const [dataPoints, setDataPoints] = useState([]);
    var last15 = [];
    
    


    useEffect(() => {
        try {
          const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
                };
        const getdata = setInterval(() => {
          axios
            .get(baseURL) //, { headers }
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
                    // var date = toString(item.date);
                    // const hour = parseInt(date.substring(12,14),10);
                    // const minute =parseInt(date.substring(15,17),10);
                    return ({
                      x: date,//${hour}:${minute}
                      y: wqi
                    });
                });
                setDataPoints(formattedData);
                //console.log(dataPoints);
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
      
      const options = 
        {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Historical WQI values "
			},
			axisX:{
				valueFormatString: last15.date,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "WQI ",
				valueFormatString: "%",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return  CanvasJS.formatNumber(e.value, "0.00") + "%";
					}
                }
			},
			data: [{
				type: "area",
				xValueFormatString: "DD MMM",
				yValueFormatString: "##0.00",
				dataPoints: dataPoints
		        }]
        }

        
    
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
}
 