import React from "react";
import { PolarArea } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function PolarChart({ chartData }) {
  return <PolarArea data={chartData} />;
}

export default PolarChart;