import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import Form from 'components/CustomerForm/CustomerForm'
import useUser from 'hooks/useUser'
import useSingleCustomer from 'hooks/useSingleCustomer'
import Spinner from 'components/Spinner/Spinner'

const CustomerUpdateForm = ({ params }) => {
  const { isLogged } = useUser()
  const { customer, customerState } = useSingleCustomer({ id: params.id })
  const { hasError, isLoading } = customerState
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando... | Rent a car</title>
        </Helmet>
        <Spinner />
      </>
    )
  }

  if (!customer) return null

  return (
    <>
      <Helmet>
        <title>Editar Cliente | Rent a car</title>
      </Helmet>
      <Form customer={customer} />
    </>
  )
}

export default CustomerUpdateForm
