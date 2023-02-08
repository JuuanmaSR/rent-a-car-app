import React from 'react'
import customerAvatar from 'assets/customer-avatar.png'
import './styles.css'
import { useLocation } from 'wouter'

const CustomerDetail = ({ customer, deleteCustomer }) => {
  const [_, navigate] = useLocation()

  const handleEdit = (id) => {
    navigate(`/admin/clientes/editar/${id}`)
  }

  const handleDelete = (id) => {
    let wannaDelete = confirm('Esta seguro que desea eliminar este cliente?')

    if (wannaDelete) {
      deleteCustomer(id)
      navigate('/admin/clientes')
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
            <button className="add-button" onClick={() => handleDelete(23)}>
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
