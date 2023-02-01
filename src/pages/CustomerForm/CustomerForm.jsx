import Form from 'components/CustomerForm/CustomerForm'
import { Helmet } from 'react-helmet'

const CustomerForm = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Cliente | Rent a car</title>
      </Helmet>
      <h1>Agregar un cliente</h1>
      <Form />
    </>
  )
}

export default CustomerForm
