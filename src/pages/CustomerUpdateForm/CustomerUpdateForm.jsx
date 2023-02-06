import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import Form from 'components/CustomerForm/CustomerForm'
import useUser from 'hooks/useUser'
import useSingleCustomer from 'hooks/useSingleCustomer'

const CustomerUpdateForm = ({ params }) => {
  const { isLogged } = useUser()
  const { customer, customerState } = useSingleCustomer({ id: params.id })
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

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
