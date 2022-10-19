import { useState, useEffect, useContext } from 'react';
import { DemandContext } from "utils/context/demand";
import Loading from 'assets/loading.svg';
import Graphic from 'pages/graphic';

function Table() {
  const { order, setOrder, allItems, setAllItems } = useContext(DemandContext);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState("https://dashboardv1.azurewebsites.net/api/orders?pageNumber=1&pageSize=20");
  
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

      setAllItems(resultOrder)
      setOrder(resultOrder.data);
      setLoading(false);
    })();
  }, [pagination]) // eslint-disable-line

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
        <div className="w-full xl:w-9/12 mb-12 xl:mb-0 px-4 mx-auto mt-[10rem]">
          <h2 className="font-[700] text-[#1e293b] text-[6rem] leading-[5.5rem]">Insights <br /><span className="text-[#136eff] text-[4rem]">do poder de entrega por equipe.</span></h2>
        </div>
        {!loading && <Graphic allItems={allItems}/>}
        <section className="py-1 bg-blueGray-50 rounded-[.25rem]">
          <div className="w-full xl:w-9/12 mb-12 xl:mb-0 px-4 mx-auto mt-[2rem]">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                        <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                        N° identificação
                      </th>
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right">
                        Equipe
                      </th>
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right">
                        Data de entrega realizada
                      </th>
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right">
                        Qtd. Produto
                      </th>
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right">
                        Data de criação
                      </th>
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right">
                        Endereço
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {order && order.map(item => 
                      <tr className="hover:bg-[#eff5ff] border-t-[.0625rem] border-slate-200" key={item.id}>
                        <th className="font-[700] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-left text-blueGray-700">
                          {item.id}
                        </th>
                        <td className="font-[400] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-right">
                          {item.nameTeam}
                        </td>
                        <td className="font-[400] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-right">
                          {new Date(item.deliveryDate).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="font-[400] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-right">
                          {item.product.length}
                        </td>
                        <td className="font-[400] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-right">
                          {new Date(item.createAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="font-[400] border-t-0 px-6 align-middle border-l-0 border-r-0 text-[1.2rem] whitespace-nowrap p-4 text-right">
                          {item.address}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ol className="flex justify-end gap-3 text-xs font-medium m-[1.5rem] border-t-[.0625rem] pt-[1.5rem] border-slate-200">
                {allItems.previousPage &&
                  <li>
                    <button
                      onClick={() => setPagination(allItems.previousPage)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200"
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                }
                  
                {allItems.nextPage &&
                  <li>
                    <button
                      onClick={() => setPagination(allItems.nextPage)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200 mr-[1rem]"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                }
              </ol>
            </div>
          </div>
        </section>
      </>
    }
    </>
  );
}

export default Table;