import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { Helmet } from 'react-helmet'

import Form from 'components/CarForm/CarForm'

import ModalPortal from 'components/Modal/Modal'
import useUser from 'hooks/useUser'
import useSingleCar from 'hooks/useSingleCar'
import Spinner from 'components/Spinner/Spinner'

const CarUpdateForm = ({ params }) => {
  const { isLogged } = useUser()
  const { id } = params
  const { car, carState } = useSingleCar({ id })
  const { isLoading, hasError } = carState
  const [_, navigate] = useLocation()
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/vehiculos')
  }

  if (!car) return null

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando ... | Rent a car</title>
        </Helmet>
        <Spinner />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Editar vehículo | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal hasButton={true} onClose={handleClose}>
          <Form car={car} />
        </ModalPortal>
      )}
    </>
  )
}

export default CarUpdateForm
