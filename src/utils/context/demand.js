import { createContext, useState } from 'react';

export const DemandContext = createContext();
DemandContext.displayName = 'DemandContext';

export const DemandProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [allItems, setAllItems] = useState([]);

  return (
    <DemandContext.Provider value={{
      order,
      setOrder,
      allItems,
      setAllItems
    }}>
      {children}
    </DemandContext.Provider>
  )
}