import { Helmet } from 'react-helmet'
import LoginForm from 'components/Login/Login'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Rent a car</title>
      </Helmet>
      <LoginForm />
    </>
  )
}

export default Home
