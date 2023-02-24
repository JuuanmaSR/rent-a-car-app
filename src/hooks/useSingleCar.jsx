import { useContext, useEffect, useState } from 'react'
import CarContext from 'context/CarContext'
import UserContext from 'context/UserContext'
import getSingleCar from 'services/getSingleCar'

const useSingleCar = ({ id }) => {
  const { jwt } = useContext(UserContext)
  const { cars } = useContext(CarContext)
  const carFromCache = () => {
    if (cars) {
      return cars.find((car) => car.id == id)
    }
    return false
  }
  const [car, setCar] = useState(carFromCache)
  const [carState, setCarState] = useState({ isLoading: false, hasError: false })

  useEffect(() => {
    if (!car) {
      setCarState({ isLoading: true, hasError: false })
      getSingleCar({ jwt, id })
        .then((car) => {
          if (car) {
            setCar(car)
            setCarState({ isLoading: false, hasError: false })
          }
          if (!car) {
            setCarState({ isLoading: false, hasError: true })
          }
        })
        .catch((error) => {
          setCarState({ isLoading: false, hasError: true })
        })
    }
  }, [id])

  return { car, carState }
}

export default useSingleCar
