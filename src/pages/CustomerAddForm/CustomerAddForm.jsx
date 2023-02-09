import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import ModalPortal from 'components/Modal/Modal'
import Form from 'components/CustomerForm/CustomerForm'
import useUser from 'hooks/useUser'

const CustomerForm = () => {
  const { isLogged } = useUser()
  const [showModal, setShowModal] = useState(true)
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/clientes')
  }

  return (
    <>
      <Helmet>
        <title>Agregar Cliente | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal onClose={handleClose}>
          <Form />
        </ModalPortal>
      )}
    </>
  )
}

export default CustomerForm
