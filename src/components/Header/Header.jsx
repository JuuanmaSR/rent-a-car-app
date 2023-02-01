import useUser from 'hooks/useUser'
import React from 'react'
import { Link } from 'wouter'
import './styles.css'
const Header = () => {
  const { isLogged, user, logout } = useUser()

  const handleClick = () => {
    logout()
  }

  return (
    <>
      <header className="header-app">
        <h1 className="header-title">
          <Link to="/admin">Rent a car</Link>
        </h1>
        {isLogged ? (
          <div className="header-userdata">
            <h2>{user ? user.username : ''}</h2>
            <button className="logout-button" onClick={handleClick}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <h2>Bienvenido!</h2>
        )}
      </header>
    </>
  )
}

export default Header
