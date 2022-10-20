import { useContext } from 'react';
import { DemandContext } from "utils/context/demand";

const Table = () => {
  const { order, allItems, setPagination } = useContext(DemandContext);

  const previous = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>

  const next = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>

  return (
    <>
      <section className="py-1 bg-blueGray-50 rounded-[.25rem]">
        <div className="w-full px-[2rem] xl:p-0 xl:w-9/12 mb-12 xl:mb-0 mx-auto mt-[2rem]">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                      N° identificação
                    </th>
                    {['Equipe', 'Data de entrega realizada', 'Qtd. Produto', 'Data de criação', 'Endereço'].map((column, index) => (
                      <th className="font-[700] px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-[2rem] text-[1.2rem] uppercase border-l-0 border-r-0 whitespace-nowrap text-right" key={index}>
                        {column}
                      </th>
                    ))}
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
            <ol className="flex justify-end gap-4 text-xs font-medium border-t-[.0625rem] py-[1.5rem] px-[1rem] border-slate-200">
              {allItems.previousPage &&
                <li>
                  <button
                    onClick={() => setPagination(allItems.previousPage)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200"
                  >
                  {previous}
                  </button>
                </li>
              }
              <li>
                <span className="text-[1.2rem] inline-flex h-10 w-20 items-center justify-center rounded border border-gray-200 px-[.5rem]"
                >
                  {`${allItems.pageNumber} de ${allItems.totalPages}`}
                </span>
              </li>
              {allItems.nextPage &&
                <li>
                  <button
                    onClick={() => setPagination(allItems.nextPage)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200"
                  >
                    {next}
                  </button>
                </li>
              }
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

export default Table;