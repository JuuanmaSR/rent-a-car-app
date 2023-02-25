import { useContext, useState } from 'react'
import addCarService from 'services/addCar'
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

  return {
    cars,
    addCar,
    carState,
  }
}

export default useCar
