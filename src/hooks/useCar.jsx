import { useContext } from 'react'
import CarContext from 'context/CarContext'

const useCar = () => {
  const { cars } = useContext(CarContext)

  return {
    cars,
  }
}

export default useCar
