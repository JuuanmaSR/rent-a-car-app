import Panel from 'components/Panel/Panel'
import useUser from 'hooks/useUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

const AdminPanel = () => {
  const { isLogged } = useUser()
  const [_, navigate] = useLocation()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged])
  return (
    <>
      <Helmet>
        <title>Admin Panel | Rent a car</title>
      </Helmet>

      <Panel />
    </>
  )
}

export default AdminPanel
