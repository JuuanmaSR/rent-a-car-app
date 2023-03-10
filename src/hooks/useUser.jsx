import { useCallback, useContext, useState } from 'react'
import { useLocation } from 'wouter'
import { useJwt } from 'react-jwt'
import loginService from 'services/login'

import UserContext from 'context/UserContext'

const useUser = () => {
  const { jwt, setJwt } = useContext(UserContext)
  const { decodedToken } = useJwt(jwt)
  const [_, navigate] = useLocation()

  const [loginState, setLoginState] = useState({ loading: false, error: false, message: null })

  const login = ({ email, password }) => {
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
        setLoginState({ loading: false, error: true, message: error })
        console.error(error)
      })
  }

  const logout = () => {
    document.cookie = `token=; Max-Age=0`
    setJwt(null)
    const timeout = setTimeout(() => {
      navigate('/')
    }, 2000)
    return () => clearTimeout(timeout)
  }

  return {
    login,
    logout,
    isLoginLoading: loginState.loading,
    hasLoginMessage: loginState.message,
    isLogged: Boolean(jwt),
    user: decodedToken,
  }
}

export default useUser
