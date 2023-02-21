import React, { useContext, useEffect, useState } from 'react'
import getCars from 'services/getCars'
import UserContext from 'context/UserContext'

const Context = React.createContext({})

export function CarContextProvider({ children }) {
  const { jwt } = useContext(UserContext)
  const [cars, setCars] = useState()
  useEffect(() => {
    getCars({ jwt }).then(({ cars }) => setCars(cars))
  }, [jwt])
  return <Context.Provider value={{ cars, setCars }}>{children}</Context.Provider>
}

export default Context
