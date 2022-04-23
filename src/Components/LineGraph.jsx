import React,{useEffect,useState} from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};




function LineGraph() {

const [y_AxisCases, setY_AxisCases] = useState([])
const [x_AxisLabel, setX_AxisLabel] = useState([])

const d = new Date();

const formatDate = (date) =>{
const d = new Date(date)
const year = d.getFullYear();
const month = `0${d.getMonth() +1}`.slice(-2);
const _date = d.getDate();
return `${year}-${month}-${_date}`  
}

const setDates= () =>{
  const to = formatDate(d);
  const from = formatDate(d.setDate(d.getDate()-8));
  
  getChartData(from, to)
}

const getChartData =  (from, to)  => {
 axios.get(`https://api.covid19api.com/country/india/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`).then((res) => {
  
   
   setY_AxisCases(res.data.map(d => d.Cases))
   setX_AxisLabel(res.data.map( d => d.Date ))
 })
}

useEffect(() => {
  formatDate()
  setDates();
  
}, [])



  
  
    return  <Line height='220%'  data={{
      labels : x_AxisLabel.map(l=> l.substr(0,10) ) ,
      maintainAspectRatio: false,
      datasets: [
        {
          label: 'Total Cases - Last 7 days',
          fill : true,
          lineTension: 1,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderCapStyle:'butt',
          borderDashOffset:0.0,
          borderJoinStyle:'miter',
          pointBorderColor:'rgba(75,192,192,1)' ,
          pointHoverBackgroundColor:'rgba(75,192,192,1',
          pointBorderWidth:'1',
          pointHoverRadius: 5,
          pointHoverBorderWidth:2,
          pointRadius: 1,
          pointHitRadius: 10 ,
          data : y_AxisCases
        }
      ],
      
    }} 
    
    > </Line>
}

export default LineGraph