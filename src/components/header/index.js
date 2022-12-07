import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  let url = window.location.href;
  
  const handleClick = () => {
    if (url.includes('/formOrder')) {
      navigate("/")
    } else {
      navigate("/formOrder")
    }
  }

  return (
    <header className="flex justify-end items-center z-10 p-[0 2rem] bg-white border-y-[.0625rem] border-slate-200 h-[6rem] fixed top-0 left-0 right-0
    p-10
    ">
      <div className="flex space-x-2 justify-center h-[3rem]">
        <button onClick={handleClick} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-1xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {url.includes('/formOrder') ? 'Voltar para a lista' : 'Criar nova encomenda'}
        </button>
      </div>
    </header>
  )
}

export default Header;