import { useContext, useEffect, useState } from 'react'
import UserContext from 'context/UserContext'
import getSingleCustomerSerive from 'services/getSingleCustomer'
import useCustomer from 'hooks/useCustomer'

const useSingleCustomer = ({ id }) => {
  const { jwt } = useContext(UserContext)
  const { customers } = useCustomer()
  const customerFromCache = () => {
    if (customers) {
      return customers.find((customer) => customer.id == id)
    }
    return false
  }
  const [customer, setCustomer] = useState(customerFromCache)
  const [customerState, setCustomerState] = useState({
    isLoading: false,
    hasError: false,
  })
  useEffect(() => {
    if (!customer) {
      setCustomerState({
        loading: true,
        hasError: false,
      })
      getSingleCustomerSerive({ jwt, id })
        .then((res) => {
          const { customer } = res
          setCustomer(customer)
          setCustomerState({ loading: false, hasError: false })
        })
        .catch((error) => {
          setCustomerState({ loading: false, hasError: true })
        })
    }
  }, [id, customer])

  return { customer, customerState }
}

export default useSingleCustomer
