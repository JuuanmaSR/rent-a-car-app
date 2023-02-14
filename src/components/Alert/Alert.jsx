import Spinner from 'components/Spinner/Spinner'
import './styles.css'

const Alert = ({ severity, message, title, children }) => {
  if (severity === 'success') {
    return (
      <>
        <div className="alert-container success">
          <h2 className="title">{title ? title : 'Exito'}</h2>
          <p>{message}</p>
        </div>
      </>
    )
  }
  if (severity === 'error') {
    return (
      <>
        <div className="alert-container error">
          <h2 className="title">{title ? title : 'Error'}</h2>
          <p>{message}</p>
        </div>
      </>
    )
  }

  if (severity === 'wait') {
    return (
      <>
        <div className="alert-container">
          {children}
          <Spinner />
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
