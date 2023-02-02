import { useCallback, useContext, useState } from 'react'
import { useLocation } from 'wouter'
import { useJwt } from 'react-jwt'
import loginService from 'services/login'
import addCustomerService from 'services/addCustomer'
import UserContext from 'context/UserContext'

const useUser = () => {
  const { jwt, setJwt, customers, setCustomers } = useContext(UserContext)
  const { decodedToken } = useJwt(jwt)
  const [_, navigate] = useLocation()

  const [loginState, setLoginState] = useState({ loading: false, error: false, message: null })
  const [customerState, setCustomerState] = useState({
    loading: false,
    hasMessage: { value: false, message: { successful: false, failure: false, neutral: false } },
    successfulAction: false,
  })

  const login = useCallback(
    ({ email, password }) => {
      setLoginState({ loading: true, error: false, message: null })
      loginService({ email, password })
        .then((res) => {
          const { access_token, message } = res

          access_token
            ? (document.cookie = `token=${access_token}; max-age=${
                60 * 60 * 24
              }; samesite=strict;secure`)
            : setLoginState({ loading: false, error: true, message: message })

          loginState.error
            ? setLoginState({ loading: false, error: true, message })
            : setLoginState({ loading: false, error: false, message: message })
          setJwt(access_token)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    [setJwt],
  )

  const logout = useCallback(() => {
    document.cookie = `token=; Max-Age=0`
    setJwt(null)
    const timeout = setTimeout(() => {
      navigate('/')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [setJwt])

  const addCustomer = useCallback((formData) => {
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
        if (res.statusCode === 500) {
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
  })

  return {
    login,
    logout,
    isLoginLoading: loginState.loading,
    hasLoginMessage: loginState.message,
    isLogged: Boolean(jwt),
    user: decodedToken,
    customers,
    addCustomer,
    customerState,
  }
}

export default useUser
