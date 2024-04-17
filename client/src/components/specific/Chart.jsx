import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

// Registering necessary components for both charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Your data object remains the same
const getLast7Days = () => {
    const currentDate = moment();
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      // Subtract i days from the current date
      const dayDate = currentDate.clone().subtract(i, "days");
      const dayName = dayDate.format("dddd");
      // Since we're going backwards, we use push to add the dayName to the end
      last7Days.push(dayName); 
    }
    // The array will have the days in reverse order, so we reverse it to start from 7 days ago to yesterday
    return last7Days.reverse();
  };
  
const labels = getLast7Days();
const lineChartOption = {
  responsive: true,
  Plugin: {
    Legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ values = [] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "#f87979",
        borderColor: "#f87979", // Needed for line chart
        fill: true,
        data: values,
      },
    ],
  };
  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} options={lineChartOption} />
    </div>
  );
};
const DougnutChartOption = {
  responsive: true,
  Plugin: {
    Legend: {
      display: false,
    }
  },
  // cutout :90,
 
};

const DoughnutChart = ({values = [], labels=[]}) => {
    const data = {
        labels: labels,
        datasets: [
          {
            data: values,
            label: "Total Chats vs Group Chats",
            backgroundColor: ["#9980FA","#ED4C67"],
            borderColor: ["#9980DA","#ED4C8A"] ,
            offset:10
          },
        ],
      };
  return (
    <div>
      <h2>Doughnut Chart</h2>
      <Doughnut style={{zIndex:10}} data={data} options={DougnutChartOption} />
    </div>
  );
};

export { LineChart, DoughnutChart };
