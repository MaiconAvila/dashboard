import React from "react";
import { PolarArea } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function PolarChart({ chartData, title, description }) {
  return (
    <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col justify-self-end">
    <div className="w-full">
      <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">{title}</h2>
      <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">{description}</p>
    </div>
    <PolarArea data={chartData} />
  </div>

  )
}

export default PolarChart;