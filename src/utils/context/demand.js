import { createContext, useState } from 'react';

export const DemandContext = createContext();
DemandContext.displayName = 'DemandContext';

export const DemandProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [pagination, setPagination] = useState("https://dashboardv1.azurewebsites.net/api/orders?pageNumber=1&pageSize=20");

  return (
    <DemandContext.Provider value={{
      order,
      setOrder,
      pagination,
      setPagination,
      allItems,
      setAllItems
    }}>
      {children}
    </DemandContext.Provider>
  )
}