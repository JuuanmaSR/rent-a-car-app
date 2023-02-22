import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import Dashboard from 'components/Dashboard/Dashboard'
import useUser from 'hooks/useUser'
import useCar from 'hooks/useCar'
import CarsTable from 'components/CarsTable/CarsTable'
import Spinner from 'components/Spinner/Spinner'

const CarDashboard = () => {
  const { isLogged } = useUser()
  const { cars } = useCar()
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  return (
    <>
      <Helmet>
        <title>Vehiculos | Rent a car</title>
      </Helmet>
      <Dashboard title="Vehiculos" formRoute={'/'}>
        {cars ? <CarsTable cars={cars} /> : <Spinner />}
      </Dashboard>
    </>
  )
}

export default CarDashboard
