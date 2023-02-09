import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const Modal = ({ children, onClose }) => {
  return (
    <>
      <div className="modal">
        <div onClick={onClose} className="overlay"></div>

        <div className="modal-content">
          <button className="add-button modal-button" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

const ModalPortal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById('modal-root'),
  )
}

export default ModalPortal
