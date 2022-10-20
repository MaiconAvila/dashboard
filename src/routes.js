import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemandProvider } from "utils/context/demand";
import Home from "pages/home";
import Header from "components/header";

function Router() {
  return (
    <BrowserRouter>
      <DemandProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </DemandProvider>
    </BrowserRouter>
  )
}

export default Router;