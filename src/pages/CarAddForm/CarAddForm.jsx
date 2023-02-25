import { useLocation } from 'wouter'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import CarForm from 'components/CarForm/CarForm'
import useUser from 'hooks/useUser'
import ModalPortal from 'components/Modal/Modal'

const CarAddForm = () => {
  const { isLogged } = useUser()
  const [_, navigate] = useLocation()
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/vehiculos')
  }

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  return (
    <>
      <Helmet>
        <title>Agregar vehículo | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal hasButton={true} onClose={handleClose}>
          <CarForm />
        </ModalPortal>
      )}
    </>
  )
}

export default CarAddForm
