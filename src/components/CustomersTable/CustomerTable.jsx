import './styles.css'

const CustomersTable = ({ customers }) => {
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
          {customers.map(({ id, firstName, lastName, phoneNumber, address }) => {
            return (
              <tr key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{phoneNumber}</td>
                <td>{address}</td>
                <td>
                  <button>Detalle</button>
                  <button>Editar</button>
                  <button>Eliminar</button>
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
