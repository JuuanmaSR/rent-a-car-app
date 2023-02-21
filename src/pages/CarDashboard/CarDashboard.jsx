import Dashboard from 'components/Dashboard/Dashboard'
import useUser from 'hooks/useUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

const CarDashboard = () => {
  const { isLogged } = useUser()
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
      <Dashboard title="Vehiculos" formRoute={'/'} />
    </>
  )
}

export default CarDashboard
