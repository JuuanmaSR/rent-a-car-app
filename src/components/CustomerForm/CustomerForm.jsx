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
        <form className="customer-form" onSubmit={handleSubmit(onSubmit)}>
          {customer && (
            <input type="number" value={customer.id} {...register('id')} hidden={true} />
          )}
          <div className="input-container">
            <input
              className={errors.firstName ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Nombre"
              {...register('firstName', {
                required: 'Completa este campo',
                maxLength: {
                  value: 40,
                  message: 'Demasiados caracteres',
                },
              })}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName.message || errors.firstName.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.lastName ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Apellido"
              {...register('lastName', {
                required: 'Completa este campo',
                maxLength: {
                  value: 40,
                  message: 'El campo apellido no debe ser mayor a 40 caracteres',
                },
              })}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName.message || errors.lastName.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.email ? 'customer-input has-error' : 'customer-input'}
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Completa es campo',
                maxLength: {
                  value: 60,
                  message: 'El campo email no debe ser mayor a 60 caracteres',
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message || errors.email.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.documentType ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Tipo de documento"
              list="document-type"
              {...register('documentType', {
                required: 'Completa este campo',
                maxLength: { value: 20, message: 'Demasiados caracteres' },
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
              className={errors.document ? 'customer-input has-error' : 'customer-input'}
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
              className={errors.phoneNumber ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Telefono"
              {...register('phoneNumber', {
                required: 'Completa este campo',
                maxLength: { value: 20, message: 'Demasiados caracteres' },
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
              className={errors.address ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Direcci??n"
              {...register('address', {
                required: 'Completa este campo',
                maxLength: {
                  value: 90,
                  message: 'Demasiados caracteres',
                },
              })}
            />
            {errors.address && (
              <p className="error-message">{errors.address.message || errors.address.type}</p>
            )}
          </div>

          <div className="input-container">
            <input
              className={errors.dateOfBirth ? 'customer-input has-error' : 'customer-input'}
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
              className={errors.nationality ? 'customer-input has-error' : 'customer-input'}
              type="text"
              placeholder="Nacionalidad"
              {...register('nationality', {
                required: 'Completa este campo',
                maxLength: {
                  value: 35,
                  message: 'Demasiados caracteres',
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
