import useUser from 'hooks/useUser'
import React from 'react'
import './styles.css'
const Header = () => {
  const { isLogged, user, logout } = useUser()

  const handleClick = () => {
    logout()
  }

  return (
    <>
      <header className="header-app">
        <h1 className="header-title">Rent a car</h1>
        {isLogged ? (
          <div className="header-userdata">
            <h2>{user ? user.username : ''}</h2>
            <button onClick={handleClick}>Logout</button>
          </div>
        ) : (
          <h2>Bienvenido!</h2>
        )}
      </header>
    </>
  )
}

export default Header
