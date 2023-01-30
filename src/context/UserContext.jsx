import React, { useState, useEffect } from 'react'
import getCustomers from 'services/getCustomers'
const Context = React.createContext({})

export function UserContextProvider({ children }) {
  const [jwt, setJwt] = useState(() => document.cookie.replace('token=', ''))
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    if (!jwt) setCustomers([])
    getCustomers({ jwt }).then((customers) => setCustomers(customers))
  }, [jwt])
  return (
    <Context.Provider value={{ jwt, setJwt, customers, setCustomers }}>{children}</Context.Provider>
  )
}

export default Context
