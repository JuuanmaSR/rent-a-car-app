import useUser from 'hooks/useUser'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles.css'

const CustomerForm = () => {
  const { isLogged, addCustomer } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  const onSubmit = (values) => {
    addCustomer(values)
  }

  return (
    <>
      <form className="customer-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Nombre"
          {...register('firstName', {
            required: 'El campo nombre esta vacío',
            maxLength: { value: 40, message: 'El campo nombre no debe ser mayor a 40 caracteres' },
          })}
        />
        {errors.firstName && <p>{errors.firstName.message || errors.firstName.type}</p>}
        <input
          placeholder="Apellido"
          {...register('lastName', {
            required: 'El campo apellido esta vacío',
            maxLength: {
              value: 40,
              message: 'El campo apellido no debe ser mayor a 40 caracteres',
            },
          })}
        />
        {errors.lastName && <p>{errors.lastName.message || errors.lastName.type}</p>}
        <input
          placeholder="Email"
          type="email"
          {...register('email', {
            required: 'El campo email esta vacío',
            maxLength: { value: 60, message: 'El campo email no debe ser mayor a 60 caracteres' },
          })}
        />
        {errors.email && <p>{errors.email.message || errors.email.type}</p>}

        <input
          placeholder="Tipo de documento"
          list="document-type"
          {...register('documentType', { required: 'El campo tipo de documento esta vacío' })}
        />
        {errors.documentType && <p>{errors.documentType.message || errors.documentType.type}</p>}

        <input
          placeholder="Documento"
          {...register('document', { required: 'El campo documento esta vacío' })}
        />
        {errors.document && <p>{errors.document.message || errors.document.type}</p>}

        <input
          placeholder="Telefono"
          {...register('phoneNumber', { required: 'El campo telefono esta vacío' })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}

        <input
          placeholder="Dirección"
          {...register('address', {
            required: 'El campo dirección esta vacío',
            maxLength: {
              value: 90,
              message: 'El campo dirección no debe ser mayor a 90 caracteres',
            },
          })}
        />
        {errors.address && <p>{errors.address.message || errors.address.type}</p>}

        <input
          placeholder="Fecha de nacimiento"
          type="date"
          {...register('dateOfBirth', { required: 'El campo fecha de nacimiento esta vacío' })}
        />
        {errors.dateOfBirth && <p>{errors.dateOfBirth.message || errors.dateOfBirth.type}</p>}

        <input
          placeholder="Nacionalidad"
          {...register('nationality', {
            required: 'El campo nacionalidad esta vacío',
            maxLength: {
              value: 35,
              message: 'El campo nacionalidad no debe ser mayor a 35 caracteres',
            },
          })}
        />
        {errors.nationality && <p>{errors.nationality.message || errors.nationality.type}</p>}

        <input type="submit" />
      </form>
    </>
  )
}

export default CustomerForm
