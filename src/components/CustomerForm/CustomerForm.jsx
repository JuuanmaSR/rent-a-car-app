import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import Alert from 'components/Alert/Alert'
import useCustomer from 'hooks/useCustomer'
import ModalPortal from 'components/Modal/Modal'
import './styles.css'

const CustomerForm = ({ customer }) => {
  const { addCustomer, customerState, updateCustomer } = useCustomer()
  const [_, navigate] = useLocation()
  const { loading, hasMessage, successfulAction } = customerState
  const [showModal, setShowModal] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: useMemo(() => {
      if (customer) {
        return {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          documentType: customer.documentType,
          document: customer.document,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
          dateOfBirth: customer.dateOfBirth,
          nationality: customer.nationality,
        }
      }
      return null
    }),
  })

  useEffect(() => {
    if (successfulAction) {
      const timeout = setTimeout(() => {
        navigate('/admin/clientes')
      }, 3000)
      return () => clearTimeout(timeout)
    }
    setFocus('firstName')
  }, [setFocus, successfulAction])

  const onSubmit = (values, event) => {
    event.preventDefault()
    if (values.id) {
      updateCustomer({ newData: values })
    } else {
      addCustomer(values)
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className="form-container">
        <form className="form-content" onSubmit={handleSubmit(onSubmit)}>
          {customer && (
            <input type="number" value={customer.id} {...register('id')} hidden={true} />
          )}
          <div className="input-container">
            <input
              className={errors.firstName ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Nombre"
              {...register('firstName', {
                required: 'Completa este campo',
                maxLength: {
                  value: 40,
                  message: 'El máximo de caracteres es 40',
                },
              })}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName.message || errors.firstName.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.lastName ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Apellido"
              {...register('lastName', {
                required: 'Completa este campo',
                maxLength: {
                  value: 40,
                  message: 'El máximo de caracteres es 40',
                },
              })}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName.message || errors.lastName.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.email ? 'form-input has-error' : 'form-input'}
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Completa es campo',
                maxLength: {
                  value: 60,
                  message: 'El máximo de caracteres es 60',
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message || errors.email.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.documentType ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Tipo de documento"
              list="document-type"
              {...register('documentType', {
                required: 'Completa este campo',
                maxLength: { value: 20, message: 'El máximo de caracteres es 20' },
              })}
            />
            {errors.documentType && (
              <p className="error-message">
                {errors.documentType.message || errors.documentType.type}
              </p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.document ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Documento"
              {...register('document', { required: 'Completa este campo' })}
            />
            {errors.document && (
              <p className="error-message">{errors.document.message || errors.document.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.phoneNumber ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Telefono"
              {...register('phoneNumber', {
                required: 'Completa este campo',
                maxLength: { value: 20, message: 'El máximo de caracteres es 20' },
              })}
            />
            {errors.phoneNumber && (
              <p className="error-message">
                {errors.phoneNumber.message || errors.phoneNumber.type}
              </p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors.address ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Dirección"
              {...register('address', {
                required: 'Completa este campo',
                maxLength: {
                  value: 90,
                  message: 'El máximo de caracteres es 90',
                },
              })}
            />
            {errors.address && (
              <p className="error-message">{errors.address.message || errors.address.type}</p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors.dateOfBirth ? 'form-input has-error' : 'form-input'}
              placeholder="Fecha de nacimiento"
              type="date"
              {...register('dateOfBirth', { required: 'Completa este campo' })}
            />
            {errors.dateOfBirth && (
              <p className="error-message">
                {errors.dateOfBirth.message || errors.dateOfBirth.type}
              </p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors.nationality ? 'form-input has-error' : 'form-input'}
              type="text"
              placeholder="Nacionalidad"
              {...register('nationality', {
                required: 'Completa este campo',
                maxLength: {
                  value: 35,
                  message: 'El máximo de caracteres es 35',
                },
              })}
            />
            {errors.nationality && (
              <p className="error-message">
                {errors.nationality.message || errors.nationality.type}
              </p>
            )}
          </div>

          <input className="submit-button" type="submit" onClick={() => setShowModal(true)} />
        </form>
      </div>

      {loading && (
        <ModalPortal hasButton={false}>
          <Alert severity={'wait'}>
            <p>{hasMessage.message.neutral}</p>
          </Alert>
        </ModalPortal>
      )}

      {hasMessage.message.failure && showModal && (
        <ModalPortal onClose={handleClose}>
          <Alert severity={'error'} message={hasMessage.message.failure} />
        </ModalPortal>
      )}
      {hasMessage.message.successful && (
        <ModalPortal hasButton={false}>
          <Alert severity={'success'} message={hasMessage.message.successful} />
        </ModalPortal>
      )}
    </>
  )
}

export default CustomerForm
