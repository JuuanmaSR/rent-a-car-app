import { useLocation } from 'wouter'

const CarsTable = ({ cars }) => {
  const [_, navigate] = useLocation()

  const handleDetail = ({ id }) => {
    navigate(`/admin/vehiculos/detalle/${id}`)
  }

  return (
    <>
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Kilometros</th>
            <th>Precio p/dia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.kilometers}</td>
                <td>${car.dailyPrice}</td>
                <td>
                  <button
                    className="table-action-button info"
                    onClick={() => handleDetail({ id: car.id })}
                  >
                    <i class="fi fi-br-info"></i>
                  </button>
                  <button className="table-action-button edit">
                    <i class="fi fi-br-edit-alt"></i>
                  </button>
                  <button className="table-action-button delete">
                    <i class="fi fi-br-trash"></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default CarsTable
