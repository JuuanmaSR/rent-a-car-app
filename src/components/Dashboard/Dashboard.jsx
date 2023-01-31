import { Link } from 'wouter'
import './styles.css'

const Dashboard = ({ children, title, formRoute }) => {
  return (
    <>
      <div className="container">
        <div className="header">
          <h2>{title}</h2>
          <Link className="add-button" to={formRoute}>
            Agregar {title}
          </Link>
        </div>
        <div className="nav">
          <Link className="nav-link" to="/admin/alquileres">
            Alquileres
          </Link>
          <Link className="nav-link" to="/admin/vehiculos">
            Vehiculos
          </Link>
          <Link className="nav-link" to="/admin/clientes">
            Clientes
          </Link>
        </div>
        <div className="article">{children}</div>
      </div>
    </>
  )
}

export default Dashboard
