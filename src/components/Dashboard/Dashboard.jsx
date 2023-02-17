import React from 'react'
import { Link } from 'wouter'
import './styles.css'

const Dashboard = ({ children, title, formRoute }) => {
  const handleRefresh = () => {
    return window.location.reload(true)
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>{title}</h2>
          <button className="add-button" onClick={handleRefresh}>
            Refresh
          </button>
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

export default React.memo(Dashboard)
