import { useState, useEffect, useContext } from 'react';
import { DemandContext } from "utils/context/demand";
import Loading from 'assets/loading.svg';
import Graphic from 'pages/graphic';
import Table from 'components/table';

function Home() {
  const { setOrder, pagination, setAllItems } = useContext(DemandContext);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    (async () => {
      let resultOrder = await fetch(pagination, {
        method: 'GET'
      })
      .then
      ((res) => {
        if(res.ok){
          return res.json();
        }
      })
      .catch((err) => console.error(err));

      setAllItems(resultOrder);
      setOrder(resultOrder.data);
      setLoading(false);
    })();
  }, [pagination]) // eslint-disable-line

  const titleComponent = () => {
    return (
      <div className="w-full px-[2rem] xl:p-0 xl:w-9/12 mb-12 xl:mb-0 mx-auto mt-[10rem]">
        <h2 className="font-[700] text-[#1e293b] text-[5rem] sm:text-[6rem] leading-[4rem] sm:leading-[5.5rem]">Insights <br /><span className="text-[#136eff] text-[2.5rem] sm:text-[4rem]">do poder de entrega por equipe.</span></h2>
      </div>
    )
  }

  return (
    <>
      {loading ? 
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex justify-center items-center flex-col bg-[#3b82f6] rounded-full w-[12rem] h-[12rem] text-[#fff]">
            <img className="w-[5rem] mb-[1rem]" src={Loading} alt="Ícone de carregamento enquanto os dados da página não carregam por completo."/>
            Carregando...
          </div>
        </div>
      :
        <>
          {titleComponent()}
          <Graphic/>
          <Table/>
        </>
      }
    </>
  );
}

export default Home;