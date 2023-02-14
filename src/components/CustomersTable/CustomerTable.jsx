import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import ModalPortal from 'components/Modal/Modal'
import Confirm from 'components/Confirm/Confirm'
import Alert from 'components/Alert/Alert'
import './styles.css'

const CustomersTable = ({ customers, deleteCustomer, customerState }) => {
  const [_, navigate] = useLocation()
  const { loading, hasMessage, successfulAction } = customerState
  const [showModal, setShowModal] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [customerId, setCustomerId] = useState()

  const handleOpenConfirm = (id) => {
    setCustomerId(id)
    setConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setConfirmOpen(false)
  }

  const handleConfirm = () => {
    deleteCustomer(customerId)
    handleCloseConfirm()
    setShowModal(true)
  }

  const handleDetail = (id) => {
    navigate(`/admin/clientes/detail/${id}`)
  }

  const handleEdit = (id) => {
    navigate(`/admin/clientes/editar/${id}`)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [successfulAction])

  if (confirmOpen) {
    return (
      <>
        <ModalPortal hasButton={true} onClose={handleCloseConfirm}>
          <Confirm
            title={'Eliminar cliente'}
            content={'Esta seguro que desea eliminar este cliente ?'}
            onClose={handleCloseConfirm}
            onConfirm={handleConfirm}
          />
        </ModalPortal>
      </>
    )
  }

  if (showModal) {
    if (hasMessage.message.neutral) {
      return (
        <>
          <ModalPortal hasButton={false}>
            {loading && <Alert severity={'wait'} children={hasMessage.message.neutral} />}
          </ModalPortal>
        </>
      )
    }
    if (hasMessage.message.successful) {
      return (
        <>
          <ModalPortal hasButton={false}>
            {hasMessage.message.successful && (
              <Alert severity={'success'} message={hasMessage.message.successful} />
            )}
          </ModalPortal>
        </>
      )
    }
    if (hasMessage.message.failure) {
      return (
        <>
          <ModalPortal hasButton={false}>
            {hasMessage.message.failure && (
              <Alert severity={'error'} message={hasMessage.message.failure} />
            )}
          </ModalPortal>
        </>
      )
    }
  }

  return (
    <>
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>
                  <button onClick={() => handleDetail(customer.id)}>Detalle</button>
                  <button onClick={() => handleEdit(customer.id)}>Editar</button>
                  <button onClick={() => handleOpenConfirm(customer.id)}>Eliminar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default CustomersTable
