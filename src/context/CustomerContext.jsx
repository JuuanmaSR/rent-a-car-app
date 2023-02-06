import React, { useContext, useEffect, useState } from 'react'
import getCustomers from 'services/getCustomers'
import UserContext from 'context/UserContext'

const Context = React.createContext({})

export function CustomerContextProvider({ children }) {
  const { jwt } = useContext(UserContext)
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    getCustomers({ jwt }).then((customers) => setCustomers(customers))
  }, [jwt])
  return <Context.Provider value={{ customers, setCustomers }}>{children}</Context.Provider>
}

export default Context
