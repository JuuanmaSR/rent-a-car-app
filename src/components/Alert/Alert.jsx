import './styles.css'

const Alert = ({ severity, message, children }) => {
  if (severity === 'success') {
    return (
      <>
        <div className="alert-container success">
          <h2 className="title">Exito!</h2>
          <p>{message}</p>
        </div>
      </>
    )
  }
  if (severity === 'error') {
    return (
      <>
        <div className="alert-container error">
          <h2 className="title">Fracaso!</h2>
          <p>{message}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="alert-container">{children}</div>
    </>
  )
}

export default Alert
