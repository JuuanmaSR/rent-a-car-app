import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import ModalPortal from 'components/Modal/Modal'
import Alert from 'components/Alert/Alert'
import useCar from 'hooks/useCar'
import './styles.css'

const CarForm = ({ car }) => {
  const { addCar, updateCar, carState } = useCar()
  const { hasMessage, loading: isLoading, successfulAction } = carState
  const [showModal, setShowModal] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: useMemo(() => {
      if (car) {
        return {
          model: car.model,
          brand: car.brand,
          year: car.year,
          kilometers: car.kilometers,
          color: car.color,
          airConditioner: `${car.airConditioner}`,
          gearbox: car.gearbox,
          dailyPrice: car.dailyPrice,
        }
      }
      return null
    }),
  })

  const [_, navigate] = useLocation()

  useEffect(() => {
    if (successfulAction) {
      const timeOut = setTimeout(() => {
        navigate('/admin/vehiculos')
      }, 3000)
      return () => clearTimeout(timeOut)
    }
    setFocus('model')
  }, [successfulAction])

  const onSubmit = (values, event) => {
    event.preventDefault()
    values.id ? updateCar({ car: values }) : addCar({ car: values })
  }

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <>
      <div className="form-container">
        <form className="form-content" onSubmit={handleSubmit(onSubmit)}>
          {car && <input type="number" value={car.id} {...register('id')} hidden={true} />}
          <div className="input-container">
            <input
              className={errors.model ? 'form-input has-error' : 'form-input'}
              placeholder="Modelo"
              type="text"
              {...register('model', {
                required: 'Completa este campo',
                maxLength: { value: 40, message: 'El máximo de caracteres es 40' },
              })}
            />
            {errors.model && (
              <p className="error-message">{errors.model.message || errors.model.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.brand ? 'form-input has-error' : 'form-input'}
              placeholder="Marca"
              type="text"
              {...register('brand', {
                required: 'Completa este campo',
                maxLength: { value: 40, message: 'El máximo de caracteres es 40' },
              })}
            />
            {errors.brand && (
              <p className="error-message">{errors.brand.message || errors.brand.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.year ? 'form-input has-error' : 'form-input'}
              placeholder="Año"
              type="number"
              {...register('year', {
                required: 'Completa este campo',
                maxLength: { value: 4, message: 'El máximo de caracteres es 4' },
              })}
            />
            {errors.year && (
              <p className="error-message">{errors.year.message || errors.year.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.kilometers ? 'form-input has-error' : 'form-input'}
              placeholder="Kilometros"
              type="number"
              {...register('kilometers', {
                required: 'Completa este campo',
                maxLength: { value: 7, message: 'El máximo de caracteres es 7' },
              })}
            />
            {errors.kilometers && (
              <p className="error-message">{errors.kilometers.message || errors.kilometers.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.color ? 'form-input has-error' : 'form-input'}
              placeholder="Color"
              type="text"
              {...register('color', {
                required: 'Completa este campo',
                maxLength: { value: 35, message: 'El máximo de caracteres es 35' },
              })}
            />
            {errors.color && (
              <p className="error-message">{errors.color.message || errors.color.type}</p>
            )}
          </div>
          <div className="input-container">
            <select
              className={errors.airConditioner ? 'form-select has-error' : 'form-select'}
              placeholder="Aire acondicionado"
              {...register('airConditioner', { required: 'Completa este campo' })}
            >
              <option value={''} hidden={true} disabled={true} selected={true}>
                Aire acondicioado
              </option>
              <option value={'true'}>Si</option>
              <option value={'false'}>No</option>
            </select>
            {errors.airConditioner && (
              <p className="error-message">
                {errors.airConditioner.message || errors.airConditioner.type}
              </p>
            )}
          </div>
          <div className="input-container">
            <select
              className={errors.gearbox ? 'form-select has-select-error' : 'form-select'}
              {...register('gearbox', { required: 'Completa este campo' })}
            >
              <option value={''} hidden={true} disabled={true} selected={true}>
                Transmición
              </option>
              <option value="automatica">Automática</option>
              <option value="manual">Manual</option>
            </select>
            {errors.gearbox && (
              <p className="error-message">{errors.gearbox.message || errors.gearbox.type}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className={errors.dailyPrice ? 'form-input has-error' : 'form-input'}
              placeholder="Precio por día"
              type="number"
              {...register('dailyPrice', {
                required: 'Completa este campo',
                maxLength: { value: 7, message: 'El máximo de caracteres es 7' },
              })}
            />
            {errors.dailyPrice && (
              <p className="error-message">{errors.dailyPrice.message || errors.dailyPrice.type}</p>
            )}
          </div>
          <div className="input-container"></div>
          <input type="submit" className="submit-button" />
        </form>
      </div>
      {isLoading && (
        <ModalPortal hasButton={false}>
          <Alert severity={'wait'}>
            <p>{hasMessage.message.neutral}</p>
          </Alert>
        </ModalPortal>
      )}
      {hasMessage.message.failure && showModal && (
        <ModalPortal hasButton={true} onClose={handleClose}>
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

export default CarForm
