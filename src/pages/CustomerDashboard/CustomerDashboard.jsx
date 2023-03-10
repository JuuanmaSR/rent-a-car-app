import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import useUser from 'hooks/useUser'
import useCustomer from 'hooks/useCustomer'

import CustomersTable from 'components/CustomersTable/CustomerTable'
import Dashboard from 'components/Dashboard/Dashboard'
import Spinner from 'components/Spinner/Spinner'

const CustomerDashboard = () => {
  const { isLogged } = useUser()
  const { customers, deleteCustomer, customerState } = useCustomer()
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
          <CustomersTable
            customers={customers}
            deleteCustomer={deleteCustomer}
            customerState={customerState}
          />
        ) : (
          <Spinner />
        )}
      </Dashboard>
    </>
  )
}

export default CustomerDashboard
