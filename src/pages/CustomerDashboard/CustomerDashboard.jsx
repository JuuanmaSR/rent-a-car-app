import CustomersTable from 'components/CustomersTable/CustomerTable'
import Dashboard from 'components/Dashboard/Dashboard'
import useUser from 'hooks/useUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

const CustomerDashboard = () => {
  const { isLogged, customers } = useUser()
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
        {customers ? <CustomersTable customers={customers} /> : <h2>No se encontraron clientes</h2>}
      </Dashboard>
    </>
  )
}

export default CustomerDashboard
