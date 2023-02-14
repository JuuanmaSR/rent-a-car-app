import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

import Spinner from 'components/Spinner/Spinner'
import ModalPortal from 'components/Modal/Modal'
import useCustomer from 'hooks/useCustomer'
import Detail from 'components/CustomerDetail/CustomerDetail'
import useSingleCustomer from 'hooks/useSingleCustomer'

const CustomerDetail = ({ params }) => {
  const { id } = params
  const [showModal, setShowModal] = useState(true)
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

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/clientes')
  }

  return (
    <>
      {showModal && (
        <ModalPortal onClose={handleClose}>
          <Detail customer={customer} deleteCustomer={deleteCustomer} />
        </ModalPortal>
      )}
    </>
  )
}

export default CustomerDetail
