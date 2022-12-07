import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemandProvider } from "utils/context/demand";
import Home from "pages/home";
import Header from "components/header";
import FormOrder from "pages/order/form";

function Router() {
  return (
    <BrowserRouter>
      <DemandProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route exact path="/formOrder" element={<FormOrder/>} />
        </Routes>
      </DemandProvider>
    </BrowserRouter>
  )
}

export default Router;