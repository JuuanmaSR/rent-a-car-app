import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'
import Spinner from 'components/Spinner/Spinner'
import ModalPortal from 'components/Modal/Modal'
import Detail from 'components/CarDetail/CarDetail'
import useSingleCar from 'hooks/useSingleCar'
import Alert from 'components/Alert/Alert'

const CarDetail = ({ params }) => {
  const { id } = params
  const { car, carState } = useSingleCar({ id })
  const { hasError, isLoading } = carState
  const [_, navigate] = useLocation()
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    navigate('/admin/vehiculos')
  }

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando ... | Rent a car</title>
        </Helmet>
        <ModalPortal hasButton={false}>
          <Spinner />
        </ModalPortal>
      </>
    )
  }
  if (hasError) {
    return (
      <>
        <Helmet>
          <title>No se encontro el vehículo | Rent a car</title>
        </Helmet>
        <ModalPortal hasButton={true} onClose={handleClose}>
          <Alert
            severity={'error'}
            message={'Es posible que el vehículo no exista o haya sido eliminado.'}
          />
        </ModalPortal>
      </>
    )
  }
  return (
    <>
      <Helmet>
        <title>Detalle vehículo | Rent a car</title>
      </Helmet>
      {showModal && (
        <ModalPortal hasButton={true} onClose={handleClose}>
          <Detail car={car} />
        </ModalPortal>
      )}
    </>
  )
}

export default CarDetail
