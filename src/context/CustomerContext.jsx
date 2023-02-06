import React, { useState } from 'react'

const Context = React.createContext({})

export function CustomerContextProvider({ children }) {
  const [customers, setCustomers] = useState([])

  return <Context.Provider value={{ customers, setCustomers }}>{children}</Context.Provider>
}

export default Context
