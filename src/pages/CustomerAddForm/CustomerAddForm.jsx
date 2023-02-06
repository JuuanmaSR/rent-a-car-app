import Form from 'components/CustomerForm/CustomerForm'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import useUser from 'hooks/useUser'

const CustomerForm = () => {
  const { isLogged } = useUser()

  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  return (
    <>
      <Helmet>
        <title>Agregar Cliente | Rent a car</title>
      </Helmet>
      <Form />
    </>
  )
}

export default CustomerForm
