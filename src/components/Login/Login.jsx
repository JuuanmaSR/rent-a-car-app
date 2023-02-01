import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'wouter'
import useUser from 'hooks/useUser'
import './styles.css'

const LoginForm = () => {
  const [_, navigate] = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { login: loginService, isLogged, isLoginLoading, hasLoginMessage } = useUser()

  useEffect(() => {
    if (isLogged) {
      const timeout = setTimeout(() => {
        navigate('/admin')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isLogged])

  const onSubmit = (values) => {
    loginService(values)
  }

  return (
    <>
      {isLogged && <p>Felicidades ah iniciado sesión con éxito</p>}
      {isLoginLoading && <p>Verificando credenciales</p>}
      {hasLoginMessage && <p>{hasLoginMessage}</p>}
      {!isLoginLoading && (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register('email', { required: 'El campo email esta vacio' })}
            placeholder="Email"
          />
          {errors.email && <p> {errors.email.message || errors.email.type} </p>}
          <input
            type="password"
            {...register('password', {
              required: 'El campo password esta vacio',
              minLength: {
                value: 4,
                message: 'La cantidad de caracteres debe ser mayor o igual a 4',
              },
            })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message || errors.password.type}</p>}
          <input type="submit" />
        </form>
      )}
    </>
  )
}

export default LoginForm
