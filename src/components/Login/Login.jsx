import {useForm} from 'react-hook-form'
import useUser from 'hooks/useUser'
import './styles.css'

const LoginForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const {login: loginService} = useUser()

    const onSubmit = (values) => {
        loginService(values)
    }

    return <>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email', {required: true})} placeholder="Email"/>
            {errors.email && <p> Email is required </p>}
            <input type='password' {...register('password', {required: true})} placeholder="Password"/>
            {errors.password && <p> Password is required </p>}
            <input type="submit" />
        </form>
    </>
}


export default LoginForm