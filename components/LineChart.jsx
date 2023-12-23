import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Total Amount Earned",
      position: "bottom",
    },
  },
};

const labels = ["Initial Amount", "Amount Earned"];

const LineChart = ({ totalAmount }) => {
  console.log(totalAmount);
  const data = {
    labels,
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, 20000000],
        borderColor: "#fe7f07",
        backgroundColor: "rgba(254,127,7,0.7)",
        hoverBackgroundColor: "red",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
