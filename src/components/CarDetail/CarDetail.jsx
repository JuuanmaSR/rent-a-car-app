import carAvatar from 'assets/car-avatar-2.png'
import './styles.css'

const CarDetail = ({ car }) => {
  return (
    <>
      <div className="detail-table-container">
        <div className="customer-avatar-container">
          <div className="car-avatar">
            <img src={carAvatar} alt="car-avatar" />
          </div>
          <div className="customer-detail-buttons">
            <button className="add-button">Editar</button>
            <button className="add-button">Eliminar</button>
          </div>
        </div>
        <table className="detail-table">
          <tbody>
            <tr>
              <th>Precio por día</th>
              <td>${car.dailyPrice}</td>
            </tr>
            <tr>
              <th>Modelo</th>
              <td>{car.model}</td>
            </tr>
            <tr>
              <th>Marca</th>
              <td>{car.brand}</td>
            </tr>
            <tr>
              <th>Año</th>
              <td>{car.year}</td>
            </tr>
            <tr>
              <th>Kilómetros</th>
              <td>{car.kilometers}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{car.color}</td>
            </tr>
            <tr>
              <th>Aire Acondicionado</th>
              <td>{car.airConditioner ? 'Si' : 'No'}</td>
            </tr>
            <tr>
              <th>Transmisión</th>
              <td>{car.gearbox}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CarDetail
