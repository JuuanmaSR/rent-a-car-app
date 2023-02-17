import { useContext, useState } from 'react'
import CustomerContext from 'context/CustomerContext'
import UserContext from 'context/UserContext'

import addCustomerService from 'services/addCustomer'
import updateCustomerService from 'services/updateCustomer'
import deleteCustomerService from 'services/deleteCustomer'

const useCustomer = () => {
  const { jwt } = useContext(UserContext)
  const { customers, setCustomers } = useContext(CustomerContext)
  const [customerState, setCustomerState] = useState({
    loading: false,
    hasMessage: { value: false, message: { successful: false, failure: false, neutral: false } },
    successfulAction: false,
  })

  const addCustomer = (formData) => {
    setCustomerState({
      loading: true,
      hasMessage: {
        value: true,
        message: { ...{}, neutral: 'Verificando datos...' },
      },
      isCreated: false,
    })
    addCustomerService({ data: formData, jwt })
      .then((res) => {
        if (!res.customer || res.statusCode === 500) {
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: { ...{}, neutral: false, failure: 'El cliente no pudo ser creado' },
            },
            successfulAction: false,
          })
        }
        if (res.customer) {
          setCustomers((prevCustomers) => prevCustomers.concat([res.customer]))
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                neutral: false,
                failure: false,
                successful: 'El cliente fue creado con exito',
              },
            },
            successfulAction: true,
          })
        }
      })
      .catch((error) => {
        setCustomerState({
          loading: false,
          hasMessage: {
            value: true,
            message: { neutral: false, successful: false, failure: 'A ocurrido un error' },
          },
          successfulAction: false,
        })
        console.error(error)
      })
  }

  const deleteCustomer = (id) => {
    setCustomerState({
      loading: true,
      hasMessage: { value: true, message: { ...{}, neutral: 'Verificando datos...' } },
      successfulAction: false,
    })
    deleteCustomerService({ jwt, id })
      .then((res) => {
        const { message, statusCode } = res
        if (statusCode === 404) {
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: { ...{}, neutral: false, failure: 'No se encontro el cliente' },
            },
            successfulAction: false,
          })
        }
        if (message) {
          setCustomers((prevCustomers) => {
            const notDeleted = prevCustomers.filter((customer) => customer.id != id)
            return notDeleted
          })
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: {
                neutral: false,
                failure: false,
                successful: 'El cliente se elimino correctamente',
              },
            },
            successfulAction: true,
          })
        }
      })
      .catch((error) => {
        setCustomerState({
          loading: false,
          hasMessage: {
            value: true,
            message: { neutral: false, successful: false, failure: 'A ocurrido un error' },
          },
          successfulAction: false,
        })
        console.log(error)
      })
  }
  const updateCustomer = ({ newData }) => {
    setCustomerState({
      loading: true,
      hasMessage: { value: true, message: { ...{}, neutral: 'Verificando datos...' } },
      successfulAction: false,
    })
    updateCustomerService({ jwt, newData })
      .then((res) => {
        if (!res.customer) {
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: { ...{}, failure: 'El cliente no pudo ser actualizado' },
            },
            successfulAction: false,
          })
        }
        if (res.customer) {
          setCustomerState({
            loading: false,
            hasMessage: {
              value: true,
              message: { ...{}, successful: 'El cliente fue actualizado con exito' },
            },
            successfulAction: true,
          })
        }
      })
      .catch((error) => {
        setCustomerState({
          loading: false,
          hasMessage: {
            value: true,
            message: { neutral: false, successful: false, failure: 'A ocurrido un error' },
          },
        })
        console.log(error)
      })
  }

  return { customers, addCustomer, customerState, deleteCustomer, updateCustomer }
}

export default useCustomer
