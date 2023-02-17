import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import ModalPortal from 'components/Modal/Modal'
import Confirm from 'components/Confirm/Confirm'
import Alert from 'components/Alert/Alert'
import customerAvatar from 'assets/customer-avatar.png'
import './styles.css'

const CustomerDetail = ({ customer, deleteCustomer, deleteCustomerState }) => {
  const { loading, hasMessage, successfulAction } = deleteCustomerState
  const [_, navigate] = useLocation()
  const [confrimOpen, setConfirmOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleEdit = (id) => {
    navigate(`/admin/clientes/editar/${id}`)
  }

  const handleOpenConfirm = () => {
    setConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setConfirmOpen(false)
    setShowModal(false)
  }

  const handleConfirm = () => {
    deleteCustomer(customer.id)
    handleCloseConfirm()
    setShowModal(true)
  }

  useEffect(() => {
    if (successfulAction) {
      const timeOut = setTimeout(() => {
        setShowModal(false)
        navigate('/admin/clientes')
      }, 3000)
      return () => clearTimeout(timeOut)
    }
  }, [successfulAction])

  if (confrimOpen) {
    return (
      <ModalPortal hasButton={true} onClose={handleCloseConfirm}>
        <Confirm
          title={'Eliminar cliente'}
          content={`Esta seguro que desea eliminar este cliente ID: #${customer.id}?`}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirm}
        />
      </ModalPortal>
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
          <ModalPortal hasButton={true} onClose={handleCloseConfirm}>
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
          <ModalPortal hasButton={true} onClose={handleCloseConfirm}>
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
      <div className="detail-table-container">
        <div className="customer-avatar-container">
          <div className="customer-avatar">
            <img src={customerAvatar} alt="customer-avatar" />
          </div>
          <div className="customer-detail-buttons">
            <button className="add-button" onClick={() => handleEdit(customer.id)}>
              Editar
            </button>
            <button className="add-button" onClick={handleOpenConfirm}>
              Eliminar
            </button>
          </div>
        </div>
        <table className="detail-table">
          <tbody>
            <tr>
              <th>Nombre</th>
              <td>{customer.firstName}</td>
            </tr>
            <tr>
              <th>Apellido</th>
              <td>{customer.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{customer.email}</td>
            </tr>
            <tr>
              <th className="document-type">{customer.documentType.toLowerCase()}</th>
              <td>{customer.document}</td>
            </tr>
            <tr>
              <th>Telefono</th>
              <td>{customer.phoneNumber}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td>{customer.address}</td>
            </tr>
            <tr>
              <th>Fecha de nacimiento</th>
              <td>{customer.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Nacionalidad</th>
              <td>{customer.nationality}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default React.memo(CustomerDetail)
