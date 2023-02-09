import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const Modal = ({ children, onClose, hasButton = true }) => {
  return (
    <>
      <div className="modal">
        <div onClick={onClose} className="overlay"></div>

        <div className="modal-content">
          {hasButton && (
            <button className="add-button modal-button" onClick={onClose}>
              cerrar
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  )
}

const ModalPortal = ({ children, onClose, hasButton }) => {
  return ReactDOM.createPortal(
    <Modal onClose={onClose} hasButton={hasButton}>
      {children}
    </Modal>,
    document.getElementById('modal-root'),
  )
}

export default ModalPortal
