import React from "react";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData} />;
}

export default DoughnutChart;