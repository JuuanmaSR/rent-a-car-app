import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import useUser from 'hooks/useUser'
import useCustomer from 'hooks/useCustomer'

import CustomersTable from 'components/CustomersTable/CustomerTable'
import Dashboard from 'components/Dashboard/Dashboard'

const CustomerDashboard = () => {
  const { isLogged } = useUser()
  const { customers, deleteCustomer } = useCustomer()
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])
  return (
    <>
      <Helmet>
        <title>Clientes | Rent a car</title>
      </Helmet>
      <Dashboard title="Clientes" formRoute={'/admin/clientes/agregar'}>
        {customers ? (
          <CustomersTable customers={customers} deleteCustomer={deleteCustomer} />
        ) : (
          <h2>No se encontraron clientes</h2>
        )}
      </Dashboard>
    </>
  )
}

export default CustomerDashboard
