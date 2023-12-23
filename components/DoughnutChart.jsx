import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = React.memo(({ outOfStock, inStock }) => {
  const data = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        label: "Product Stock",
        data: [outOfStock, inStock],
        backgroundColor: ["#fe7f07", "#4b077c"],
        hoverBackgroundColor: [
          "rgba(254,127,7,0.9)",
          "rgba(6 ,182, 212,0.8)",
          "#FFCE56",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
});

DoughnutChart.displayName = "DoughnutChart";

export default DoughnutChart;
