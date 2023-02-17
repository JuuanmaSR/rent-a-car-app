import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

import Spinner from 'components/Spinner/Spinner'
import ModalPortal from 'components/Modal/Modal'
import useCustomer from 'hooks/useCustomer'
import Detail from 'components/CustomerDetail/CustomerDetail'
import useSingleCustomer from 'hooks/useSingleCustomer'
import Alert from 'components/Alert/Alert'

const CustomerDetail = ({ params }) => {
  const { id } = params
  const [showModal, setShowModal] = useState(true)
  const [_, navigate] = useLocation()
  const { deleteCustomer, customerState: deleteCustomerState } = useCustomer()
  const { customer, customerState } = useSingleCustomer({ id })
  const { hasError, isLoading } = customerState

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando ... | Rent a car</title>
        </Helmet>
        <ModalPortal hasButton={false}>
          <Spinner />
        </ModalPortal>
      </>
    )
  }
  if (hasError) {
    navigate('/admin/clientes')
  }
  if (!customer) {
    return (
      <>
        <Helmet>
          <title>No se encontro el cliente | Rent a car</title>
        </Helmet>
        <Alert
          severity={'error'}
          message={' Es posible que el cliente no exista o haya sido eliminado.'}
        />
      </>
    )
  }

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/clientes')
  }

  return (
    <>
      <Helmet>
        <title>Detalle Cliente | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal onClose={handleClose}>
          <Detail
            customer={customer}
            deleteCustomer={deleteCustomer}
            deleteCustomerState={deleteCustomerState}
          />
        </ModalPortal>
      )}
    </>
  )
}

export default CustomerDetail
