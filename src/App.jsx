import './App.css'
import LoginForm from 'components/Login/Login'

function App() {

  return (
    <div className="App">
          <LoginForm/>      
    </div>
    <UserContextProvider>
    </UserContextProvider>
  )
}

export default App
