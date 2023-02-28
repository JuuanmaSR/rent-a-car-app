import { useContext, useState } from 'react'
import addCarService from 'services/addCar'
import updateCarService from 'services/updateCar'
import CarContext from 'context/CarContext'
import UserContext from 'context/UserContext'

const useCar = () => {
  const { jwt } = useContext(UserContext)
  const { cars, setCars } = useContext(CarContext)
  const [carState, setCarState] = useState({
    loading: false,
    hasMessage: { value: false, message: { successful: false, failure: false, neutral: false } },
    successfulAction: false,
  })

  const addCar = ({ car }) => {
    setCarState({
      loading: true,
      hasMessage: { value: true, message: { ...{}, neutral: 'Verificando datos...' } },
    })
    addCarService({ jwt, data: car })
      .then((res) => {
        if (res.statusCode === 400) {
          setCarState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                neutral: false,
                successful: false,
                failure: 'El vehiculo no pudo ser creado ',
              },
            },
            successfulAction: false,
          })
        }
        if (res.car) {
          setCars((prevCars) => prevCars.concat([res.car]))
          setCarState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                neutral: false,
                failure: false,
                successful: 'El vehículo fue creado con exito',
              },
            },
            successfulAction: true,
          })
        }
      })
      .catch((error) => {
        setCarState({
          loading: false,
          hasMessage: {
            value: true,
            message: { failure: 'A ocurrido un error', successful: false, neutral: false },
          },
          successfulAction: false,
        })
        console.error(error)
      })
  }

  const updateCar = ({ car }) => {
    setCarState({
      loading: true,
      hasMessage: { value: true, message: { ...{}, neutral: 'Verificando datos...' } },
      successfulAction: false,
    })
    updateCarService({ jwt, data: car })
      .then((res) => {
        if (res.statusCode == 400) {
          setCarState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                neutral: false,
                successful: false,
                failure: 'El vehículo no pudo ser actualizado',
              },
            },
            successfulAction: false,
          })
        }
        if (res.car) {
          setCars((prevCars) => {
            const updatedCars = prevCars.map((prevCar) => {
              if (prevCar.id === res.car.id) {
                return res.car
              }
              return prevCar
            })
            prevCars = updatedCars
            return prevCars
          })
          setCarState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                successful: 'El vehículo fue actualizado con exito',
                ...{},
              },
            },
            successfulAction: true,
          })
        }
      })
      .catch((error) => {
        setCarState({
          loading: false,
          hasMessage: {
            value: true,
            message: { neutral: false, successful: false, failure: 'A ocurrido un error' },
          },
          successfulAction: false,
        })
        console.error(error)
      })
  }

  return {
    cars,
    addCar,
    updateCar,
    carState,
  }
}

export default useCar
