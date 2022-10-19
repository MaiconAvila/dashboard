import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "pages/table";
import { DemandProvider } from "utils/context/demand";

function Router() {
  return (
    <BrowserRouter>
      <DemandProvider>
        <Routes>
          <Route exact path="/" element={<Table/>} />
        </Routes>
      </DemandProvider>
    </BrowserRouter>
  )
}

export default Router;