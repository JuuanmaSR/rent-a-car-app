import loginService from 'services/login'

const useUser = () => {

    const login = ({email, password}) => {
        loginService({email, password})
        .then(res => {
            const {access_token, message} = res
            access_token? console.log(access_token): console.log(message)
        })
    }
    return {login}
}

export default useUser