import './styles.css'

const Confirm = ({ title, content, onConfirm, onClose }) => {
  return (
    <>
      <div className="confirm-container">
        <div className="confirm-content">
          <h2 className="confirm-title">{title}</h2>
          <p className="confirm-text">{content}</p>
        </div>
        <div className="confirm-buttons">
          <button className="add-button confirm-button" onClick={onClose}>
            CANCELAR
          </button>
          <button className="add-button confirm-button" onClick={onConfirm}>
            CONFIRMAR
          </button>
        </div>
      </div>
    </>
  )
}

export default Confirm
