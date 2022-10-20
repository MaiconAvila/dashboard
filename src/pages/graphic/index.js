import { useEffect, useState } from "react";
import BarChart from "components/barChart";
import LineChart from "components/lineChart";
import DoughnutChart from "components/doughnutChart";
import PolarChart from "components/polarChart";

function Graphic() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    (async () => {
      let resultOrder = await fetch("https://dashboardv1.azurewebsites.net/api/orders/DataGraphic", {
        method: 'GET'
      })
        .then
        ((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => console.error(err));
      console.log("resultOrder", resultOrder);
      setAllItems(resultOrder)
    })();
  }, []) // eslint-disable-line

  const allOmega = allItems[0];
  const allAlpha = allItems[1];
  const allBeta = allItems[2];
  const deliveryNormalize = [allOmega?.length, allAlpha?.length, allBeta?.length];
  const windowWidth = window.innerWidth;

  const data = {
    labels: ['Omega', 'Alpha', 'Beta'],
    datasets: [
      {
        label: "",
        data: deliveryNormalize,
        cutout: windowWidth > 769 ? 150 : 120,
        backgroundColor: [
          "#4f46e5",
          "#3b82f6",
          "#312e81",
        ],
      },
    ],
  };

  const dataPolar = {
    labels: ['Omega', 'Alpha', 'Beta'],
    datasets: [
      {
        label: "",
        data: deliveryNormalize,
        backgroundColor: [
          "#4f46e57a",
          "#3b82f67d",
          "#312e8170",
        ]
      },
    ],
  };

  const dataLine = {
    labels: ['Omega', 'Alpha', 'Beta'],
    datasets: [
      {
        label: "",
        data: deliveryNormalize,
        fill: true,
        borderWidth: 1.8,
        backgroundColor: [
          "#3336ff14",
        ],
        borderColor: "#3336ff"
      },
    ],
  };

  return (
    <>
      <div className="w-full px-[2rem] xl:p-0 xl:w-9/12 mb-12 xl:mb-0 mx-auto mt-[5rem] grid sm:grid-cols-2 grid-cols-1 grid-rows-4 sm:grid-rows-2 gap-y-[2rem]">
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 w-full bg-white flex items-center justify-around flex-col">
          <div className="w-full">  
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Barra</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <BarChart chartData={data} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col justify-self-end">
          <div className="w-full">
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Linha</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <LineChart chartData={dataLine} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col">
          <div className="w-full">
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Rosca</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <DoughnutChart chartData={data} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col justify-self-end">
          <div className="w-full">
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Polar</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <PolarChart chartData={dataPolar} />
        </div>
      </div>
    </>
  );
}

export default Graphic;