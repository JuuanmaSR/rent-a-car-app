import { useContext, useEffect, useCallback, useState } from 'react'
import CustomerContext from 'context/CustomerContext'
import UserContext from 'context/UserContext'

import addCustomerService from 'services/addCustomer'
import updateCustomerService from 'services/updateCustomer'
import deleteCustomerService from 'services/deleteCustomer'

const useCustomer = () => {
  const { jwt } = useContext(UserContext)
  const { customers } = useContext(CustomerContext)
  const [customerState, setCustomerState] = useState({
    loading: false,
    hasMessage: { value: false, message: { successful: false, failure: false, neutral: false } },
    successfulAction: false,
  })

  const addCustomer = useCallback(
    (formData) => {
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
          console.error(error)
        })
    },
    [addCustomerService],
  )
  const deleteCustomer = useCallback(
    (id) => {
      deleteCustomerService({ jwt, id }).then((res) => console.log(res))
    },
    [deleteCustomerService],
  )
  const updateCustomer = useCallback(
    ({ newData }) => {
      setCustomerState({
        loading: true,
        hasMessage: { value: true, message: { ...{}, neutral: 'Verificando datos...' } },
        successfulAction: false,
      })
      updateCustomerService({ jwt, newData }).then((res) => {
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
    },
    [updateCustomerService],
  )

  return { customers, addCustomer, customerState, deleteCustomer, updateCustomer }
}

export default useCustomer
