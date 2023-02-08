import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

import Spinner from 'components/Spinner/Spinner'
import useSingleCustomer from 'hooks/useSingleCustomer'
import useCustomer from 'hooks/useCustomer'
import Detail from 'components/CustomerDetail/CustomerDetail'

const CustomerDetail = ({ params }) => {
  const { id } = params
  const [_, navigate] = useLocation()
  const { deleteCustomer } = useCustomer()
  const { customer, customerState } = useSingleCustomer({ id })
  const { hasError, isLoading } = customerState

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando ... | Rent a car</title>
        </Helmet>
        <Spinner />
      </>
    )
  }
  if (hasError) {
    navigate('/admin/clientes')
  }
  if (!customer) return null

  return (
    <>
      <Detail customer={customer} deleteCustomer={deleteCustomer} />
    </>
  )
}

export default CustomerDetail
