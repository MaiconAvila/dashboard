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
      setAllItems(resultOrder)
    })();
  }, []) // eslint-disable-line

  const deliveryNormalize = [allItems[0]?.length, allItems[1]?.length, allItems[2]?.length];
  const windowWidth = window.innerWidth;

  const data = {
    general: {
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
          ]
        }
      ]
    },
    polar: {
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
        }
      ]
    },
    line: {
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
        }
      ]
    }
  };

  return (
    <>
      <div className="w-full px-[2rem] xl:p-0 xl:w-9/12 mb-12 xl:mb-0 mx-auto mt-[5rem] grid sm:grid-cols-2 grid-cols-1 grid-rows-4 sm:grid-rows-2 gap-y-[2rem]">
        <BarChart 
          chartData={data.general}
          title="Barra"
          description="Quantidade de entregas por equipe"
        />
        <LineChart 
          chartData={data.line}
          title="Linha"
          description="Quantidade de entregas por equipe"
        />
        <DoughnutChart 
          chartData={data.general}
          title="Circulo"
          description="Quantidade de entregas por equipe"
        />
        <PolarChart 
          chartData={data.polar}
          title="Polar"
          description="Quantidade de entregas por equipe"
        />
      </div>
    </>
  );
}

export default Graphic;