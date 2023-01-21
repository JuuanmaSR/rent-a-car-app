import loginService from 'services/login'

const useUser = () => {
  const { jwt, setJwt } = useContext(UserContext)

    const login = ({email, password}) => {
        loginService({email, password})
        .then(res => {
            const {access_token, message} = res
            access_token? console.log(access_token): console.log(message)
          setJwt(access_token)
        })
    }
    return {login}
    setJwt(null)
}

export default useUser