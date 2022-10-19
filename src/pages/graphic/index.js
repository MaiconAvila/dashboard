import BarChart from "components/barChart";
import LineChart from "components/lineChart";
import DoughnutChart from "components/doughnutChart";
import PolarChart from "components/polarChart";

function Graphic({ allItems }) {

  const allOmega = allItems?.data?.filter((data) => data.nameTeam === 'Omega');
  const allAlpha = allItems?.data?.filter((data) => data.nameTeam === 'Alpha');
  const allBeta = allItems?.data?.filter((data) => data.nameTeam === 'Beta');

  const deliveryNormalize = [allOmega?.length, allAlpha?.length, allBeta?.length];
  const windowWidth = window.innerWidth;

  const data = {
    labels: ['Omega', 'Alpha', 'Beta'],
    datasets: [
      {
        label: "",
        data: deliveryNormalize,
        cutout: windowWidth > 425 ? 120  : 100,
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
      <div className="w-full xl:w-9/12 mb-12 xl:mb-0 px-4 mx-auto mt-[5rem] grid grid-cols-2 grid-rows-2 gap-y-[2rem]">
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 w-full bg-white flex items-center justify-around flex-col">
          <div>  
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Barra</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <BarChart chartData={data} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col justify-self-end">
          <div>
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Linha</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <LineChart chartData={dataLine} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col">
          <div>
            <h2 className="pl-[2rem] w-[100%] font-[700] text-[#1e293b] text-[6rem] text-left">Rosca</h2>
            <p className="pl-[2rem] w-[100%] font-[400] text-[#1e293b] text-[2rem] text-left">Quantidade de entregas por equipe</p>
          </div>
          <DoughnutChart chartData={data} />
        </div>
        <div className="sm:w-[90%] lg:w-[98%] shadow-lg px-4 py-6 w-full bg-white flex items-center justify-around flex-col justify-self-end">
          <div>
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