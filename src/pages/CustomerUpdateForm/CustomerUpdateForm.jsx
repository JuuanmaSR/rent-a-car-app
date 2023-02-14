import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import Form from 'components/CustomerForm/CustomerForm'
import Spinner from 'components/Spinner/Spinner'
import useSingleCustomer from 'hooks/useSingleCustomer'
import useUser from 'hooks/useUser'
import ModalPortal from 'components/Modal/Modal'

const CustomerUpdateForm = ({ params }) => {
  const { id } = params
  const { isLogged } = useUser()
  const [showModal, setShowModal] = useState(true)
  const { customer, customerState } = useSingleCustomer({ id })
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

  const handleClose = () => {
    setShowModal(false)
    navigate(`/admin/clientes`)
  }

  return (
    <>
      <Helmet>
        <title>Editar Cliente | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal onClose={handleClose}>
          <Form customer={customer} />
        </ModalPortal>
      )}
    </>
  )
}

export default CustomerUpdateForm
