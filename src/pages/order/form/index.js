import { useState, useEffect } from 'react';
import { getTotalData } from "utils/services/teamSVC";
import { postOrderData } from "utils/services/orderSVC";
import Loading from 'assets/loading.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-maskedinput"

function Form() {
  const date = new Date();
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(date);
  const [errors, setErrors] = useState({
    address: false,
    product: false,
    team: false
  })
  const [order, setOrder] = useState(
  { 
    createAt: date,
    deliveryDate: deliveryDate,
    address: "",
    product: [],
    team: {}
  });  

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    (async () => {
      let resultTeams = await getTotalData(
        "teams/total", 'GET'
      )
      .then
      ((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.error('error', err));

      let resultProduct = await getTotalData(
        "products/total", 'GET'
      )
        .then
        ((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => console.error('error', err));

      setProducts(resultProduct)
      setTeams(resultTeams)
      setLoading(false);
    })();
  }, []) // eslint-disable-line

  useEffect(() => {
    setOrder({ ...order, product: [...productsList] })
  }, [productsList]) // eslint-disable-line

  useEffect(() => {
    if(orderStatus || !orderStatus) {
      setTimeout(() => {
        setOrderStatus(null);
      }, 2500);
    }
  }, [orderStatus]) // eslint-disable-line

  const handleSelect = (ev) => {
    const { value } = ev.target;
    const findProduct = products.find(product => product.id === parseInt(value))

    setProductsList(productsList => {
      return [...productsList, findProduct]
    })

    setErrors(
      (x) =>
        (x = {
          address: x.address,
          product: false,
          team: x.team,
        })
    )
  }

  const handleChange = (field, ev) => {
    const { value } = ev.target;

    if (field === 'team') {
      const findTeam = teams.find(team => team.id === parseInt(value))
      setOrder({ ...order, [field]: findTeam })
      setErrors(
        (x) =>
          (x = {
            address: x.address,
            product: x.product,
            team: false,
          })
      )
    } else {
      setOrder({ ...order, [field]: value })
      setErrors(
        (x) =>
          (x = {
            address: false,
            product: x.product,
            team: x.team,
          })
      )
    }
  }

  const handleValidate = () => {
    if (order.address === "") {
      setErrors(x => x = {
        address: true,
        product: x.product,
        team: x.team
      })
    }
    if (order.product.length <= 0) {
      setErrors(
        (x) =>
          (x = {
            address: x.address,
            product: true,
            team: x.team,
          })
      )
    }
    if (!order.team.id) {
      setErrors(
        (x) =>
          (x = {
            address: x.address,
            product: x.product,
            team: true,
          })
      )
    }
  }

  const handleClick = (args) => {
    if(order.address !== "" && order.product.length > 0 && order.team.id && order.deliveryDate) {
      if (order.product) {
        order.product.forEach(prod => {
          return delete prod.id
        })
      }

      const bodyOrder = {
        createAt: new Date(order.createAt),
        deliveryDate: deliveryDate,
        address: order.address,
        product: order.product,
        idTeam: order.team.id,
        nameTeam: order.team.name,
      };

      postOrderData(
        "orders", 'POST', bodyOrder
      ).then((res) => {
        if (res.ok) {
          setOrderStatus(true)
          setProductsList([])
          setDeliveryDate(date)
          setOrder({
            createAt: date,
            deliveryDate: date,
            address: "",
            product: [],
            team: {},
          })
          return res.json()
        }
      }).catch((err) => { 
        setOrderStatus(false)
        console.error(err)
      })
    } else {
      handleValidate()
    }
  }

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex justify-center items-center flex-col bg-[#3b82f6] rounded-full w-[12rem] h-[12rem] text-[#fff]">
            <img
              className="w-[5rem] mb-[1rem]"
              src={Loading}
              alt="Ícone de carregamento enquanto os dados da página não carregam por completo."
            />
            Carregando...
          </div>
        </div>
      )}
      <div className="bg-white md:border border-t border-b border-solid border-gray-300 md:rounded-lg p-10 md:w-[70%] w-full mx-auto xl:w-5/12 justify-items-center mt-[10rem] grid auto-cols-[1fr] gap-5 xl:gap-10">
        <p className="text-3xl font-semibold mb-5 text-gray-700 col-span-2">
          Formulário para Criação das Encomendas
        </p>

        <div className="w-[100%] col-span-2 sm:col-span-1">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label inline-block mb-2 text-gray-700 text-2xl font-semibold"
          >
            Data de criação (apenas leitura):
          </label>
          <input
            type="text"
            className="form-control block w-full !h-[4rem] px-3 py-1.5 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-not-allowed"
            placeholder="Data de criação"
            value={new Date(order.createAt).toLocaleDateString("pt-BR")}
            disabled
          />
        </div>

        <div className="w-[100%] col-span-2 sm:col-span-1">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label inline-block mb-2 text-gray-700 text-2xl font-semibold"
          >
            Selecione a data de entrega:
          </label>
          <DatePicker
            customInput={
              <MaskedInput mask="11/11/1111" placeholder="mm/dd/yyyy" />
            }
            minDate={new Date()}
            placeholderText={"DD/MM/AAAA"}
            className="block w-full h-[8rem] px-3 py-1.5 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            dateFormat="dd/MM/yyyy"
            selected={
              typeof deliveryDate === "string"
                ? new Date(deliveryDate)
                : deliveryDate
            }
            locale="pt-BR"
            onChange={(ev) => setDeliveryDate(ev)}
            // showMonthDropdown
            // showYearDropdown
            // dropdownMode="select"
          />
        </div>

        <div className="col-span-2 w-[100%]">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label inline-block mb-2 text-gray-700 text-2xl font-semibold"
            >
              Digite o endereço:
            </label>
            <textarea
              onChange={(ev) => handleChange("address", ev)}
              className={`
                m-0
                px-3
                py-1.5
                w-full
                text-xl
                rounded-lg
                transition
                ease-in-out
                font-normal
                form-control
                text-gray-700
                focus:bg-white
                focus:outline-none
                focus:text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300 focus:border-blue-600
              `}
              rows="3"
              placeholder="Endereço"
              value={order.address ? order.address : ""}
            ></textarea>
          </div>
          {errors.address && (
            <span className="text-red-700">Preencha o endereço</span>
          )}
        </div>

        <div className="flex justify-center w-[100%] col-span-2 sm:col-span-1 order-5 sm:order-none">
          <div className="mb-3 w-[100%]">
            <label className="form-label inline-block mb-2 text-gray-700 text-2xl font-semibold">
              Selecione os produtos:
            </label>
            <select
              onChange={handleSelect}
              className="form-select appearance-none
                block
                w-full
                h-[4rem]
                px-3
                py-1.5
                text-xl
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded-lg
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              defaultValue={"default"}
            >
              {order.product <= 0 && (
                <option value="default" selected>
                  Selecione os produtos
                </option>
              )}
              {products.length > 0 &&
                products.map((product, index) => (
                  <option value={product.id} key={index}>
                    {product.name}
                  </option>
                ))}
            </select>
            {errors.product && (
              <span className="text-red-700">Selecione um produto</span>
            )}
          </div>
        </div>

        <div className="flex justify-center w-[100%] col-span-2 sm:col-span-1">
          <div className="mb-3 w-[100%]">
            <label className="form-label inline-block mb-2 text-gray-700 text-2xl font-semibold">
              Selecione a equipe:
            </label>
            <select
              onChange={(ev) => handleChange("team", ev)}
              className="form-select appearance-none
                block
                w-full
                h-[4rem]
                px-3
                py-1.5
                text-xl
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded-lg
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              defaultValue={"default"}
            >
              {!order.team.name && (
                <option value="default" selected>
                  Selecione a equipe
                </option>
              )}
              {teams.length > 0 &&
                teams.map((team, index) => (
                  <option value={team.id} key={index}>
                    {team.name}
                  </option>
                ))}
            </select>
            {errors.team && (
              <span className="text-red-700">Selecione uma equipe</span>
            )}
          </div>
        </div>

        {productsList.length > 0 ? (
          <div className="justify-self-start text-[1.4rem] leading-9 w-full order-6 sm:order-none col-span-2 sm:col-span-1">
            <p className="text-2xl font-semibold leading-4 mb-5 text-gray-700">
              Produtos selecionados:
            </p>
            <ul className="bg-white rounded-lg border border-gray-300 w-full min-h-[4rem] text-gray-700">
              {productsList.length > 0 &&
                productsList.map((product, index) => (
                  <li
                    key={index}
                    className="px-6 py-2 last:border-0 border-b border-gray-300 w-full first:rounded-t-lg last:rounded-b-lg"
                  >
                    {product.name}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <button
          type="button"
          className="inline-block px-8 py-5 border-2 border-gray-300 text-gray-700 text-1xl leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out col-span-2 font-bold"
          onClick={handleClick}
        >
          Criar nova encomenda
        </button>

        {orderStatus ? (
          <div
            className="col-span-2 bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
            role="alert"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              className="w-[3rem] h-[3rem] mr-5 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
            <p className="text-[1.3rem] font-semibold text-gray-700">
              Encomenda criada com sucesso.
            </p>
          </div>
        ) : (
          <></>
        )}

        {!orderStatus && orderStatus !== null ? (
          <div
            className="col-span-2 bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 flex justify-center items-center w-full"
            role="alert"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times-circle"
              className="w-[7rem] h-[7rem] mr-5 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
              ></path>
            </svg>
            <p className="text-[1.3rem] font-semibold text-gray-700">
              A encomenda não foi criada, verifique se sua conexão com a
              internet está estável ou entre em contato nosso suporte (21)
              99999-9999.
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Form;